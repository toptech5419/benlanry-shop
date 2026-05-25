import * as OneSignal from '@onesignal/node-onesignal'

const configuration = OneSignal.createConfiguration({
  restApiKey: process.env.ONESIGNAL_REST_API_KEY!,
})

export const oneSignalClient = new OneSignal.DefaultApi(configuration)
export const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!

export async function sendPushNotification({
  title,
  message,
  url,
  segment = 'All',
}: {
  title: string
  message: string
  url: string
  segment?: string
}) {
  const notification = new OneSignal.Notification()
  notification.app_id = ONESIGNAL_APP_ID
  notification.included_segments = [segment]
  notification.contents = { en: message }
  notification.headings = { en: title }
  notification.url = url
  notification.chrome_web_icon = 'https://benlanry.shop/icon-192.png'

  return oneSignalClient.createNotification(notification)
}

export async function sendDealPushNotification(productName: string, discount: number, productSlug: string) {
  return sendPushNotification({
    title: `🔥 ${discount}% OFF — Limited time!`,
    message: productName,
    url: `https://benlanry.shop/product/${productSlug}`,
  })
}

export async function sendNewPickPushNotification(productName: string, productSlug: string) {
  return sendPushNotification({
    title: `⭐ New Best Pick`,
    message: productName,
    url: `https://benlanry.shop/product/${productSlug}`,
  })
}
