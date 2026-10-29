import WebSocketsArticle from '../../../views/articles/WebSocketsArticle.jsx'
import { stackItems } from '../../../data/stack.js'

export const metadata = { title: stackItems.find((item) => item.key === 'websockets').headline }

export default function Page() {
  return <WebSocketsArticle />
}
