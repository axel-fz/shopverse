import Link from 'next/link'
import React from 'react'
import { FaCircleArrowRight } from 'react-icons/fa6'

type HeaderComponentProps = {
    title?: string
    href: string
}
const HeaderComponent = ({title,href}:HeaderComponentProps) => {
  return (
    <div className="flex justify-between  items-center">
        <h2 className="font-bold text-3xl mb-4">{title}</h2>

        <Link href={href} className='text-orange-600 cursor-pointer flex items-center gap-2'>
          Show more <FaCircleArrowRight size={20} />
        
        </Link>
        
      </div>
  )
}

export default HeaderComponent
