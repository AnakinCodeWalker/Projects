import Link from 'next/link'
import { Button } from '../../ui/button'
import SearchInput from './SearchInput'

const Navbar = () => {
    return (
        <div className='w-full border border-b bg/background/95 backdrop-blur'>

            <div className='container mx-auto  px-4 sm:px-6 lg:px-8'>

                <div className='flex h-16 items-center justify-between'>

                    {/* left section */}
                    <div className='flex items-center gap-8'>
                        <Link href={"/"} className='space-x-2 flex items-center'>
                            <span className='font-bold text-3xl'>
                                <span className='bg-gradient-tr from-purple-600 to bg-indigo-600 bg-clip-text text-transparent'>Byte</span>
                                <span className=''>  Blog </span>
                            </span>
                        </Link>
                    </div>




                    {/* desktop menu */}
                    <div className='hidden md:flex items-center gap-4 '>

                        <Link href={"/articles"} className=' text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            Articles
                        </Link>

                        <Link href={"/tutorial"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            Tutorial
                        </Link>

                        <Link href={"/about"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            About
                        </Link>

                        <Link href={"/dashboard"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            Dashboard
                        </Link>


                    </div>

                    <div className='flex items-center gap-4'>
                        <SearchInput />
                    </div>

                    <div className='hidden md:flex items-center gap-2'>

                        <Button>Login</Button>
                        <Button>Signup</Button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Navbar