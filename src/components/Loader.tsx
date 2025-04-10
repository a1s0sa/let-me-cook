import Image from 'next/image'

export default function Loader() {
    return (
        <div className="loader flex justify-center items-center">
            <Image src="/loader.svg" alt="loader" height={50} width={50} />
        </div>
    )
}
