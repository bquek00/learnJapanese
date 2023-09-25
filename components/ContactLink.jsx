import Image from 'next/image'
import Link from 'next/link'

export default function ContactLink() {

    return (
       <div className='flex mt-4'>
            <Link href="mailto:bryanquek87@gmail.com">
            <Image
                    src="/images/email.png"
                    width={50}
                    height={50}
                    alt="email"
                    className='mr-2'
                />
            </Link>
            
            <Link href="https://github.com/bquek00">
            <Image
                src="/images/github.png"
                width={50}
                height={50}
                alt="github"
                className='mr-2'
            />
            </Link>

            <Link href="https://www.linkedin.com/in/bryan-quek-3099a4245">
            <Image
                src="/images/linkedin.png"
                width={50}
                height={50}
                alt="linkedin"
            />
            </Link>

       </div>
    )
}
    