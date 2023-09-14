import {GoDotFill} from 'react-icons/go'
import {BsThreeDotsVertical, BsPersonCircle} from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, query, setDoc, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../Firebase';

const Kanban = () => {

    // const [web, setWeb] = useState([
    //     {
    //         title: 'To do',
    //         tasks: [
    //             {
    //                 taskName: 'Landing Page',
    //                 person: 'Logan Smith',
    //                 tags: [
    //                     {
    //                         tagName: 'Design',
    //                         color: 'bg-yellow-400'
    //                     },
    //                     {
    //                         tagName: 'Frontend',
    //                         color: 'bg-yellow-400'
    //                     },
    //                     {
    //                         tagName: 'Backend',
    //                         color: 'bg-pink-400'
    //                     }
    //                 ]
    //             },
    //             {
    //                 taskName: 'API connection',
    //                 person: 'Logan Smith',
    //                 tags: [
    //                     {
    //                         tagName: 'Frontend',
    //                         color: 'bg-yellow-400'
    //                     },
    //                     {
    //                         tagName: 'Backend',
    //                         color: 'bg-pink-400'
    //                     }
    //                 ]
    //             },
    //             {
    //                 taskName: 'API design',
    //                 person: 'Logan Smith',
    //                 tags: [
    //                     {
    //                         tagName: 'Backend',
    //                         color: 'bg-pink-400'
    //                     }
    //                 ]
    //             },
    //             {
    //                 taskName: 'Github Repo',
    //                 person: 'Logan Smith',
    //                 tags: [
    //                     {
    //                         tagName: 'Admin',
    //                         color: 'bg-red-600'
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         title: 'In Progress',
    //         tasks: [
    //             {
    //                 taskName: 'Color Scheme on Landing Page',
    //                 person: 'Sammy Ann',
    //                 tags: [
    //                     {
    //                         tagName: 'Design',
    //                         color: 'bg-yellow-400'
    //                     },
    //                     {
    //                         tagName: 'Frontend',
    //                         color: 'bg-yellow-400'
    //                     },
    //                 ]
    //             }
    //         ]
    //     }
    // ])

    const [beginningZone, setBeginningZone] = useState();
    const [endingZone, setEndingZone] = useState();
    const [allZones, setAllZones] = useState([]);

    useEffect(() => {
        
        if(!allZones[0]) {
            onSnapshot(query(collection(db, 'boards', 'Web Design', 'zones')), snapshot => {
                let snap = snapshot.docs;
                setAllZones(snap)
            })
        }

        const draggables = document.querySelectorAll('#task')
        const droppables = document.querySelectorAll('#swim-lane')

        draggables.forEach(task => {
            task.addEventListener('dragstart', () => {
                task.classList.add('is-dragging')
            })
            task.addEventListener('dragend', () => {
                task.classList.remove('is-dragging') 
            })
        })

        droppables.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                setEndingZone(zone.children[0].id)

                const bottomTask = insertTaskAbove(zone, e.clientY)
                const curTask = document.querySelector('.is-dragging')

                if(!bottomTask) {
                    // zone.appendChild(curTask)
                    document.getElementById(`${zone.children[0].id}Add`).style.display = 'flex';
                    const toZone = zone.children[0].id;
                    const fromZone = endingZone;
                }
                else {
                    // zone.insertBefore(curTask, bottomTask)
                    document.getElementById(`${zone.children[0].id}Add`).style.display = 'flex';

                }
            })
        })

    }, [allZones])

    const insertTaskAbove = (zone, mouseY) => {
       const els = zone.querySelectorAll('#task:not(.is-dragging)')

       let closestTask;
       let closestOffset = Number.NEGATIVE_INFINITY;
       

       els.forEach(task => {
        const {top} = task.getBoundingClientRect();

        const offset = mouseY - top;

        if(offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
       })

       return closestTask;
    }

    const handleDragEnd = (zone, task) => {

        console.log(document.querySelectorAll('#swim-lane'))

        const fromZone = zone;
        const toZone = endingZone;

        document.getElementById(`${toZone}Add`).style.display = 'none';
        document.getElementById(`${fromZone}Add`).style.display = 'none';

        allZones.forEach(singleZone => {
            if(singleZone.id === fromZone && singleZone.id === toZone) {
                console.log('same')
            }
            else if(singleZone.id === toZone) {
                let oldData = singleZone.data().tasks;
                oldData.push(task)
                updateDoc(doc(db, 'boards', 'Web Design', 'zones', toZone), {
                    tasks: oldData
                })
            }
            else if(singleZone.id === fromZone) {
                let oldData = singleZone.data().tasks
                let newData = [];
                for(let i = 0; i < oldData.length; i++) {
                    if(oldData[i].taskName !== task.taskName) {
                       newData.push(oldData[i])
                    }
                }

                setDoc(doc(db, 'boards', 'Web Design', 'zones', fromZone), {
                    tasks: newData
                })
            }
            
        })
    }

    return (
        <div className="w-full h-screen bg-gray-200">

            {/* Header */}

            <section className='w-full bg-white h-[6%] pl-[5%] flex items-center border-b'>
                <div className='flex space-x-4 items-center'>
                    <GoDotFill className='text-yellow-400'/>
                    <div className='text-2xl'>Web Design</div>
                </div>
                <div className='absolute right-0 mr-10'><BsThreeDotsVertical className='text-xl'/></div>
            </section>

            {/* list of sections */}

            <section id='lanes' className="overflow-x-scroll h-[94%] py-10 pl-10 flex space-x-10">

                {allZones.map(zone => {
                    return (
                        <section id='swim-lane' className='w-[300px] rounded-lg flex flex-col space-y-2 bg-gray-100 pb-2 h-fit cursor-pointer'>
                            
                            <div id={zone.id} className='bg-white py-2 indent-2 rounded-lg flex mx-2 my-3 space-x-8'>
                                <h3 className='text-xl w-[80%]'>{zone?.id}</h3>
                                <BsThreeDotsVertical className='mt-2 flex'/>
                            </div>
                            {zone?.data()?.tasks?.map(task => {
                                return (
                                    <section id='task' className='cursor-pointer bg-white rounded-lg mx-2 py-1 border pl-3' draggable='true' onDragEnd={() => handleDragEnd(zone.id, task)} onDragStart={() => setBeginningZone(zone?.id)}>
                                    {/* onDragEnd={() => handleUpdate(zone, task)} */}
                                        <div className='flex space-x-2 items-center pb-2'>
                                            <GoDotFill className='text-yellow-400'/>
                                            <p className='text-xl'>{task.taskName}</p>
                                        </div>
                                        <div className='flex space-x-2 items-center ml-4'>
                                            <BsPersonCircle/>
                                            <p className='text-gray-400'>{task.person}</p>
                                        </div>
                                        <div className='text-xs flex gap-x-2 gap-y-2 mt-4 ml-4 mb-2 w-[90%] flex-wrap'>
                                            {task?.tags?.map(tag => {
                                                return (
                                                    <div className={`${tag?.color} p-2 rounded-xl`}>{tag?.tagName}</div>
                                                )
                                            })}
                                        </div>
                                    </section>
                                )
                            })}
                            <section id={`${zone.id}Add`} className='cursor-pointer bg-gray-300 rounded-lg mx-2 py-1 border pl-3 h-[120px] hidden'></section>
                        </section>
                    )
                })}

                <section className='w-[300px] rounded-lg flex flex-col space-y-2 bg-gray-100 pb-2 h-fit cursor-pointer items-center pt-2'>
                    + Add Section
                </section>
                
            </section>
            
        </div>
    )
}

export default Kanban;