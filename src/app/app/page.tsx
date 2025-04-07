import Recipes from '@/components/Recipe'
// import Image from 'next/image'
import Ingredients from '@/components/Ingredients'

export default function Page() {
    return (
        <div className="p-4 flex  flex-col gap-4">
            {/* <div>
                pick a chef:
                <div className='flex gap-4 p-4 justify-center items-center'>
                    <button>
                        <Image src="" alt="a chef" width={75} height={75} />
                        <h4>Top International chef</h4>
                    </button>
                    <button>
                        <Image src="" alt="a chef" width={75} height={75} />
                        <h4>5 star Nigerian chef</h4>
                    </button>
                    <button>
                        <Image src="" alt="a chef" width={75} height={75} />
                        <h4>African Intercontinental chef</h4>
                    </button>
                </div>
            </div> */}
            <div className="chef flex flex-col md:flex-row gap-4">
                <div className="bg-[#fff1e6] rounded-2xl shadow-md p-6 flex md:w-[47.5%] flex-col gap-6 ingredients">
                    <h2 className={`text-2xl underline`}>Ingredients</h2>
                    <Ingredients />
                </div>
                <div className="bg-[#fff1e6] rounded-2xl shadow-md p-6 recipe md:w-[47.5%] flex flex-col gap-4">
                    <h2 className={`text-2xl underline`}>Recipes</h2>
                    <Recipes />
                </div>
            </div>
        </div>
    )
}
