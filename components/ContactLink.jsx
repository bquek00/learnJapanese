import Image from 'next/image'

export default function ContactLink() {

    return (
       <div className='flex mt-4'>
            <Image
                src="/images/email.png"
                width={50}
                height={50}
                alt="email"
                className='mr-2'
            />

            <Image
                src="/images/github.png"
                width={50}
                height={50}
                alt="github"
                className='mr-2'
            />

            <Image
                src="/images/linkedin.png"
                width={50}
                height={50}
                alt="linkedin"
            />
       </div>
    )
}
    