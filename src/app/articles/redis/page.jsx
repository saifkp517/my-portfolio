import RedisArticle from '../../../views/articles/RedisArticle.jsx'
import { stackItems } from '../../../data/stack.js'

export const metadata = { title: stackItems.find((item) => item.key === 'redis').headline }

export default function Page() {
  return <RedisArticle />
}
