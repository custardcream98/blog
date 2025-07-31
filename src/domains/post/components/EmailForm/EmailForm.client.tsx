"use client"

import { useActionState, useEffect, useRef, useState } from "react"

import { submitEmail } from "@/domains/post/components/EmailForm/actions"

export const EmailForm = ({ slug, title }: { slug: string; title: string }) => {
  const [comment, setComment] = useState("")

  const [{ error, status }, formAction, isPending] = useActionState(
    submitEmail.bind(null, { slug, title }),
    {
      error: null,
      status: "idle",
    },
  )

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (status === "success") {
      alert("의견이 성공적으로 전송되었습니다.")

      formRef.current?.reset()
    }
  }, [status])

  return (
    <section className='mt-12 mb-12 px-1'>
      <div className='mb-6'>
        <h3 className='mb-2 text-xl font-bold tracking-tight'>의견을 남겨주세요</h3>
      </div>
      <form action={formAction} className='space-y-6' ref={formRef}>
        <div className='flex flex-col gap-6 sm:flex-row sm:gap-8'>
          <label className='flex-1'>
            <LabelSpan>이메일</LabelSpan>
            <input
              className='border-foreground/20 text-foreground placeholder-foreground/40 focus:border-foreground/60 w-full border-0 border-b bg-transparent px-0 py-2 text-sm transition-colors focus:outline-none'
              maxLength={100}
              name='email'
              placeholder='your@email.com'
              type='email'
            />
          </label>
          <label className='flex-1'>
            <LabelSpan>닉네임</LabelSpan>
            <input
              className='border-foreground/20 text-foreground placeholder-foreground/40 focus:border-foreground/60 w-full border-0 border-b bg-transparent px-0 py-2 text-sm transition-colors focus:outline-none'
              maxLength={10}
              name='nickname'
              placeholder='익명의 독자'
              type='text'
            />
          </label>
        </div>
        <label>
          <LabelSpan required>의견</LabelSpan>
          <textarea
            className='border-foreground/20 text-foreground placeholder-foreground/40 focus:border-foreground/60 w-full resize-none border-0 border-b bg-transparent px-0 py-2 text-sm transition-colors focus:outline-none'
            maxLength={1000}
            minLength={1}
            name='comment'
            onChange={(e) => setComment(e.target.value)}
            placeholder='이 글에 대한 의견을 자유롭게 남겨주세요...'
            required
            rows={3}
            value={comment}
          />
        </label>
        <div className='text-end'>
          <button
            className='hover:bg-foreground/10 bg-background mt-3 cursor-pointer rounded-md px-1 py-0.5 transition-all duration-200 active:scale-[98%] disabled:cursor-not-allowed disabled:opacity-50'
            disabled={!comment || isPending}
            type='submit'
          >
            보내기
          </button>
        </div>
      </form>
    </section>
  )
}

const LabelSpan = ({ required, children }: { required?: boolean; children: React.ReactNode }) => {
  return (
    <span className='text-foreground/80 mb-2 block text-sm font-medium'>
      {children}
      {required && <span className='ml-1 text-red-800'>*</span>}
    </span>
  )
}
