// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function handler(req, res: NextApiResponse<ResponseData>) {
  console.time('fetch with api')
  const todoResponse = await fetch(
    'https://jsonplaceholder.typicode.com/todos/',
  )
  console.timeEnd('fetch with api')
  if (!todoResponse.ok) {
    throw new Error('hi')
  }
  const data = await todoResponse.json()
  const { length } = data
  res.end(String(length))
}
