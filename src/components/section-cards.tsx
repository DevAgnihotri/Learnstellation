import { IconTrendingUp, IconBrain, IconUsers, IconRocket, IconAward } from "@tabler/icons-react"

import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <IconBrain className="size-4" />
            Active Learners
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            47,892
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20">
              <IconTrendingUp className="size-3" />
              +15.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-blue-600 dark:text-blue-400">
            Growing community <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Monthly active students
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <IconRocket className="size-4" />
            Courses Completed
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-purple-700 dark:text-purple-300">
            12,456
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20">
              <IconTrendingUp className="size-3" />
              +23.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-600 dark:text-purple-400">
            Completion rate up <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            This month's achievements
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <IconAward className="size-4" />
            Success Rate
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
            94.7%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20">
              <IconTrendingUp className="size-3" />
              +2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-emerald-600 dark:text-emerald-400">
            Excellence maintained <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Student satisfaction score
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <IconUsers className="size-4" />
            AI Interactions
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-orange-700 dark:text-orange-300">
            1.2M
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20">
              <IconTrendingUp className="size-3" />
              +34.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-orange-600 dark:text-orange-400">
            AI engagement soaring <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Weekly AI conversations
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
