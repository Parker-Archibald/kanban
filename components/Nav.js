import {GoDotFill} from 'react-icons/go'
import {TbPhotoEdit} from 'react-icons/tb'
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import { navState } from '@/atoms/NavAtom';
import { useRecoilState } from 'recoil';
import {RiTeamFill} from 'react-icons/ri'
import {ImDropbox} from 'react-icons/im'
import {HiOutlineSpeakerphone} from 'react-icons/hi'
import {BsDatabase} from 'react-icons/bs'

const Nav = () => {

    const [navStateAtom, setNavStateAtom] = useRecoilState(navState)

    const openAtom = async () => {
        setNavStateAtom(true)
        setTimeout(() => {
            document.getElementById('openMenu').style.width = '100%';
        }, 10);
    }

    const closeAtom = async () => {
        document.getElementById('openMenu').style.width = '15%';
        setTimeout(() => {
            setNavStateAtom(false)
        }, 100)
    }

    return (
        <div className=''>
            {navStateAtom === true ? (
                <div id='openMenu' className="w-0 bg-gray-600 text-white h-screen transition-width ease-in-out duration-200 overflow-hidden">
                    <div className='w-full flex justify-end pt-2 pr-4 text-2xl cursor-pointer' onClick={closeAtom}><AiOutlineLeft pointerevents='none'/></div>
                    <div className="w-full text-4xl font-bold indent-6 pt-10 text-cyan-400 mr-[150px]"><span className="text-purple-400">Kanban</span> Board</div>
                    <section>
                        <h1 className="text-2xl mt-10 indent-6">Teams</h1>
                        <section className="flex flex-col pt-6 text-gray-400">
                            <div className='flex items-center pl-10 hover:bg-gradient-to-r from-purple-400 to-cyan-400 hover:text-black cursor-pointer h-[50px] space-x-4'>
                                <RiTeamFill/>
                                <div className="">Development</div>
                            </div>
                            <div className='flex items-center pl-10 hover:bg-gradient-to-r from-purple-400 to-cyan-400 hover:text-black cursor-pointer h-[50px] space-x-4'>
                                <RiTeamFill/>
                                <div className="">Marketing</div>
                            </div>
                            <div className='flex items-center pl-10 hover:bg-gradient-to-r from-purple-400 to-cyan-400 hover:text-black cursor-pointer h-[50px] space-x-4'>
                                <RiTeamFill/>
                                <div className="">Design</div>
                            </div>
                            <div className='flex items-center pl-10 hover:bg-gradient-to-r from-purple-400 to-cyan-400 hover:text-black cursor-pointer h-[50px] space-x-4'>
                                <RiTeamFill/>
                                <div className="">Support</div>
                            </div>
                        </section>
                        <h1 className="text-2xl mt-10 indent-6">Boards</h1>
                        <section className="flex flex-col pt-6 text-gray-400">
                            <section className='flex items-center pl-10 space-x-4 hover:bg-gradient-to-r from-purple-400 to-cyan-400 cursor-pointer hover:text-black'>
                                <GoDotFill className='text-yellow-600'/>
                                <TbPhotoEdit/>
                                <div className="h-[50px] flex items-center">Web Design</div>
                            </section>
                            <section className='flex items-center pl-10 space-x-4 hover:bg-gradient-to-r from-purple-400 to-cyan-400 cursor-pointer hover:text-black'>
                                <GoDotFill className='text-green-600'/>
                                <ImDropbox/>
                                <div className="h-[50px] flex items-center">Product</div>
                            </section>
                            <section className='flex items-center pl-10 space-x-4 hover:bg-gradient-to-r from-purple-400 to-cyan-400 cursor-pointer hover:text-black'>
                                <GoDotFill className='text-blue-600'/>
                                <HiOutlineSpeakerphone/>
                                <div className="h-[50px] flex items-center">Marketing</div>
                            </section>
                            <section className='flex items-center pl-10 space-x-4 hover:bg-gradient-to-r from-purple-400 to-cyan-400 cursor-pointer hover:text-black'>
                                <GoDotFill className='text-pink-600'/>
                                <BsDatabase/>
                                <div className="h-[50px] flex items-center">Backend</div>
                            </section>
                        </section>
                    </section>
                </div>
            ): (
                <div className='w-[10%] h-screen bg-gray-600 flex pt-4'>
                    <div className='absolute bg-gray-600 border rounded-full w-8 h-8 flex justify-center items-center ml-2 cursor-pointer' onClick={openAtom}><AiOutlineRight className='w-5 h-5' pointerevent='none'/></div>
                </div>
            )}
        </div>
    )
}

export default Nav;