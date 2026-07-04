import authenticate from '@payloadcms/next-payload/dist/middleware/authenticate'
import convertPayloadJSONBody from '@payloadcms/next-payload/dist/middleware/convertPayloadJSONBody'
import withPayload from '@payloadcms/next-payload/dist/middleware/withPayload'

import { verifyRazorpayPayment } from '../../payload/endpoints/verify-razorpay-payment'

export default withPayload(authenticate(convertPayloadJSONBody(verifyRazorpayPayment)))

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
