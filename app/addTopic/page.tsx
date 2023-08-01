'use client'

import Button from '@/components/client/Button';
import Input from '@/components/client/Input';
import { TopicApi } from '@/protocol/TopicApi';
import { useAlert } from '@/redux/alert/alertActions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, memo, useCallback, useState } from 'react';

const AddTopic = () => {
  const router = useRouter();
  const { setAlert } = useAlert();
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const postHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return TopicApi.postNewTopic({title, description})
  }, [title, description])

  const postMutation = useMutation({
    mutationFn: postHandler,
    onSuccess: () => {
      router.push('/')
    },
    onError: (err) => {
      console.log("useMutation err",err)
      setAlert({title: 'Add Topic Error', text: typeof err === "string" ? err : 'Add Topic Error', open:true})
    }
  })

  return (
    <div className='grid place-items-center min-h-[40vh]'>
        <form className='flex flex-col gap-3 items-center' onSubmit={(e) => postMutation.mutate(e)}>
          <Input value={title} onChange={setTitle} placeHolder="title..."/>
          <Input value={description} onChange={setDescription} placeHolder="Description..."/>
          <Button text="Add Topic"/>
        </form>
    </div>
  )
}

export default memo(AddTopic)