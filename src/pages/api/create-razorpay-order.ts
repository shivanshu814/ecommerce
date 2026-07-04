import authenticate from '@payloadcms/next-payload/dist/middleware/authenticate'
import convertPayloadJSONBody from '@payloadcms/next-payload/dist/middleware/convertPayloadJSONBody'
import withPayload from '@payloadcms/next-payload/dist/middleware/withPayload'

import { createRazorpayOrder } from '../../payload/endpoints/create-razorpay-order'

export default withPayload(authenticate(convertPayloadJSONBody(createRazorpayOrder)))

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
