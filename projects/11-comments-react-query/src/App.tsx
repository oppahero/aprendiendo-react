import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

import { FormInput, FormTextArea } from "./components/Form";
import { Results } from "./components/Results";
import { getComments, postComment, type CommentWithId } from "./services/comments";

function App() {
  const { data, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const queryClient = useQueryClient();

  const {mutate, isPending: isLoadingMutation} = useMutation({
    mutationKey: ["addComment"],
    mutationFn: postComment,
    onSuccess: () => {
      // 1. Actualizar manualmente
      // queryClient.setQueryData(['comments'], (oldData?: CommentWithId[]) => {
      //   if(oldData == null) return [newComment]
      //   return [...oldData, newComment]
      // }) 

      // 2. Hacer nuevamente la query
      // queryClient.invalidateQueries({
      //   queryKey: ['comments']
      // })
    },
    onMutate: (newComment) => {
      queryClient.cancelQueries({
        queryKey: ['comments']
      })

      // esto lo hacemos por si hay que hacer un rollback, guardamos el estado previo
      const previousComments = queryClient.getQueryData(['comments'])

      queryClient.setQueryData(['comments'], (oldData?: CommentWithId[]) => {
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.preview = true

        if(oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      return { previousComments}    //Esto se guarda en algo llamado context
    },
    onError: (error, variables, context) => {
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)   
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation)  return

    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if(title !== '' && message !== ''){
      mutate({title, message})
    }
  };

  return (
    <main className="grid h-screen grid-cols-2">
      <div className="col-span-1 p-8 bg-white">
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />
      </div>

      <div className="col-span-1 p-8 bg-black">
        <form 
          onSubmit={handleSubmit}
          className={`${isLoadingMutation ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`}
        >
          <FormInput />
          <FormTextArea />

          <button
            type="submit"
            className="mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2"
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
