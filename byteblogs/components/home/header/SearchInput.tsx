import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchInput = () => {
    return (
        <form action='' >
            <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ' />
                <Input className='pl-10 w-48 border-black focus-visible:ring-0 '
                    type='text'
                    name='search'
                    placeholder='search Articles ..' />
            </div>
        </form>
    )
}

export default SearchInput