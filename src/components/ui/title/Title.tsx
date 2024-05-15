import { titleFont } from "@/config/font"

interface Props {
    title: string
    subtitle?: string
    className?: string
}

export const Title = ({title, subtitle, className}: Props ) => {
  return (
    <div className={`mt-3${className}`}>
        <h1 className={` ${titleFont.className} text-4xl font-boldantialiased my-10`}>
            {title}
        </h1>
        {
            subtitle && <p className="text-xl mb-5">{subtitle}</p>
        }
    </div>
  )
}
