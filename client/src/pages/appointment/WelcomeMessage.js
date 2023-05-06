import { useSelector } from 'react-redux';
import { getFomattedDate } from '../../utilities/utilities';
import Table, { TableBody, TableTr, TableTd } from '../../components/table/Table';
import CheckBox from '../../components/form/CheckBox';
import { Link } from 'react-router-dom';

const WelcomeMessage = () => {

    /**
     * welcome message, schedule time, payment details, payment amount,
     * schedule date, 
     * 
     * if new user tell him/her about username and password.
     * password will be his/her phone number.
     * 
     */
    const { isNewSchedule, newSessionNotice, registerUserSchedule } = useSelector(
        (state) => state.userSchedules
    );
    const { singleUser } = useSelector((state) => state.users);
    const { branches } = useSelector((state) => state.branches);



    // useEffect(() => {
    //     if (registerUserSchedule[2].hasOwnProperty('name')) {
    //         let notice = getNewSessionNotice(singleUser.name, registerUserSchedule);

    //     }
    // }, [registerUserSchedule]);

    const getBranchName = (branchId) => {
        let branchName = ''
        branches.map(branch => {
            if (branch._id === branchId) {
                branchName = branch.name;
            }
        })

        return branchName;
    }


    function getNewSessionNotice() {
        let date = getFomattedDate(registerUserSchedule[1].session_date);
        let time = registerUserSchedule[1].session_time;
        let sessionName = registerUserSchedule[1].session_name;
        let patientName = registerUserSchedule[2].name
        let doctorName = singleUser.name;


        return <>
            <Table headers={['Session Details', 'Patient Details']} classes='w-full sm:w-[50%] sm:translate-x-1/2 border' id='welocmemessage' >
                <TableBody>
                    <TableTr>
                        <TableTd classes='!py-2'>
                            <div className='flex'>
                                <div>Session Name</div>
                                <div>:</div>
                                <div>{sessionName}</div>
                            </div>
                        </TableTd>
                        <TableTd classes='!py-2'>
                            <div className='flex '>
                                <div>Name</div>
                                <div>:</div>
                                <div>{patientName}</div>
                            </div>
                        </TableTd>
                    </TableTr>
                    <TableTr classes='bg-gray-50'>
                        <TableTd classes='!py-2'>
                            <div className='flex   '>
                                <div>Doctor Name</div>
                                <div>:</div>
                                <div>{doctorName}</div>
                            </div>
                        </TableTd>
                        <TableTd classes='!py-2'>
                            <div className='flex '>
                                <div>Email</div>
                                <div>:</div>
                                <div>{registerUserSchedule[2].email}</div>
                            </div>
                        </TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd classes='!py-2'>
                            <div className='flex   '>
                                <div>Session Date</div>
                                <div>:</div>
                                <div>{date}</div>
                            </div>
                        </TableTd>
                        <TableTd classes='!py-2'>
                            <div className='flex '>
                                <div>Phone</div>
                                <div>:</div>
                                <div>{registerUserSchedule[2].phone}</div>
                            </div>
                        </TableTd>
                    </TableTr>
                    <TableTr classes='bg-gray-50'>
                        <TableTd classes='!py-2'>
                            <div className='flex   '>
                                <div>Session Time</div>
                                <div>:</div>
                                <div>{time}</div>
                            </div>
                        </TableTd>
                        <TableTd classes='!py-2'>
                            <div className='flex '>
                                <div>{registerUserSchedule[1].branch_id === 'online' ? 'Session Type ' : 'Branch Name '}</div>
                                <div> :</div>
                                <div>{registerUserSchedule[1].branch_id === 'online' ? 'Online' : getBranchName(registerUserSchedule[1].branch_id)}</div>
                            </div>
                        </TableTd>
                    </TableTr>
                    <TableTr classes='bg-gray-50'>
                        <TableTd classes='!py-2'>
                            <div className='flex   '>
                                <div>Session Fee</div>
                                <div>:</div>
                                <div>৳{registerUserSchedule[1].session_fee}</div>
                            </div>
                        </TableTd>
                        <TableTd classes='!py-2'>
                            <div className='flex '>
                            </div>
                        </TableTd>
                    </TableTr>
                </TableBody>
            </Table>
            <CheckBox label={
                <p>
                    I accept the <Link className='text-blue-700' to={'/terms-of-services'}> Terms of Services</Link> and <Link className='text-blue-700' to="/refund-policy" > Refund Policy</Link>
                </p>
            } />
        </>
    }
    return (
        <>
            <div className="w-full col-span-12 pt-10">
                {!isNewSchedule && Object.keys(registerUserSchedule).length && registerUserSchedule[2].hasOwnProperty('email') && getNewSessionNotice()}
            </div>
        </>
    );
}

export default WelcomeMessage;
