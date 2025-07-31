"use client"

import React, { useActionState, useContext, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { submitEmail, SubmitEmailActionState } from "@/domains/post/components/EmailForm/actions"
import { cn } from "@/utils/cn"

const INITIAL_ACTION_STATE = {
  error: null,
  status: "idle",
  submittedTime: null,
} as const satisfies SubmitEmailActionState

export const EmailForm = ({ slug, title }: { slug: string; title: string }) => {
  const [{ status, submittedTime }, formAction, isPending] = useActionState(
    submitEmail.bind(null, { slug, title }),
    INITIAL_ACTION_STATE,
  )

  const toastIdRef = useRef<null | string>(null)

  useEffect(() => {
    if (isPending) {
      toastIdRef.current = toast.loading(
        "의견을 전송하고 있어요",
        toastIdRef.current ? { id: toastIdRef.current } : undefined,
      )
    }
  }, [isPending])

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const toastId = toastIdRef.current
    if (toastId === null) return

    if (!isPending && submittedTime) {
      if (status === "success") {
        // 모든 필드 초기화
        formRef.current?.reset()
        // NOTE: comment 초기화는 EmailFormProvider에서 처리

        toast.success("의견을 남겨주셔서 감사해요! 😃", { id: toastId })
      } else if (status === "error") {
        toast.error("의견 전송에 실패했어요. 다시 시도해주세요.", {
          id: toastId,
        })
      }
    }
  }, [isPending, status, submittedTime])

  return (
    <section className='mt-12 mb-12 px-1'>
      <div className='mb-6'>
        <h3 className='mb-2 text-xl font-bold tracking-tight'>의견을 남겨주세요</h3>
      </div>
      <form action={formAction} className='space-y-6' ref={formRef}>
        <EmailFormProvider actionState={{ status, submittedTime }}>
          <div className='flex flex-col gap-6 sm:flex-row sm:gap-8'>
            <label className='flex-1'>
              <LabelSpan>이메일</LabelSpan>
              <input
                className={INPUT_STYLE}
                disabled={isPending}
                maxLength={100}
                name='email'
                placeholder='your@email.com'
                type='email'
              />
            </label>
            <label className='flex-1'>
              <LabelSpan>닉네임</LabelSpan>
              <input
                className={INPUT_STYLE}
                disabled={isPending}
                maxLength={10}
                name='nickname'
                placeholder='익명'
                type='text'
              />
            </label>
          </div>
          <CommentTextarea isPending={isPending} />
          <div className='text-end'>
            <SubmitButton isPending={isPending} />
          </div>
        </EmailFormProvider>
      </form>
    </section>
  )
}

const EmailFormContext = React.createContext<{
  comment: string
  setComment: (comment: string) => void
}>({
  comment: "",
  setComment: () => {},
})

const EmailFormProvider = ({
  actionState,
  children,
}: {
  actionState: Pick<SubmitEmailActionState, "status" | "submittedTime">
  children: React.ReactNode
}) => {
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (actionState.status === "success" && actionState.submittedTime) {
      setComment("")
    }
  }, [actionState.status, actionState.submittedTime])

  const value = useMemo(() => ({ comment, setComment }), [comment, setComment])

  return <EmailFormContext.Provider value={value}>{children}</EmailFormContext.Provider>
}

const CommentTextarea = ({ isPending }: { isPending: boolean }) => {
  const { comment, setComment } = useContext(EmailFormContext)

  return (
    <label>
      <LabelSpan required>의견</LabelSpan>
      <textarea
        className={cn(INPUT_STYLE, "resize-none")}
        disabled={isPending}
        maxLength={1000}
        minLength={1}
        name='comment'
        onChange={(e) => setComment(e.target.value)}
        placeholder='의견을 남겨주세요'
        required
        rows={3}
        value={comment}
      />
    </label>
  )
}

const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  const { comment } = useContext(EmailFormContext)

  return (
    <button
      className='hover:bg-foreground/10 bg-background mt-3 cursor-pointer rounded-md px-1 py-0.5 transition-all duration-200 active:scale-[98%] disabled:cursor-not-allowed disabled:opacity-50'
      disabled={!comment || isPending}
      type='submit'
    >
      보내기
    </button>
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

const INPUT_STYLE =
  "border-foreground/20 text-foreground placeholder-foreground/40 focus:border-foreground/60 w-full border-0 border-b bg-transparent px-0 py-2 text-sm transition-colors focus:outline-none disabled:opacity-50"
