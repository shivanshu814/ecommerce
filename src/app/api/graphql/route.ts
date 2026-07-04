import { createHandler } from 'graphql-http/lib/use/fetch'
import { NextRequest } from 'next/server'

import { getPayloadClient } from '../../../payload/payloadClient'

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient()

  const handler = createHandler({
    schema: payload.schema,
    context: () => ({
      req: {
        payload,
      },
    }),
    validationRules: (_request, args, defaultRules) =>
      defaultRules.concat(payload.validationRules(args)),
  })

  return handler(req)
}
