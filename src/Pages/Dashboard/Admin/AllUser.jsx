import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
        select: (data) => {
            // Filter users with "user" role
            return data.filter(user => user.role === 'User');
        },

    });



    /*  const [users, setUsers] = useState([]);
     console.log(users);
     const [currentPage, setCurrentPage] = useState(1);
     const usersPerPage = 5;
 
     useEffect(() => {
         // Fetch all users from the server
         axiosSecure.get('/users')
             .then(response => {
                 console.log(response.data);
                 // Filter users with "User" role
                 const filteredUsers = response.data.filter(user => user.role === 'User');
                 console.log(filteredUsers);
 
 
                 setUsers(response.data);
             })
             .catch(error => {
                 console.error('Error fetching users:', error);
             });
     }, [axiosSecure]); */

    // Logic for pagination
    /* const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
   const paginate = pageNumber => setCurrentPage(pageNumber); */

    const makeDeliveryMan = (user) => {
        axiosSecure.patch(`/users/deliveryMen/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is a Delivery Man Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const makeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl text-center font-bold mb-4">All Users: <span className='text-red-400'>{users.length}</span></h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-2 py-2">S.N</th>
                        <th className="border px-2 py-2">User Name</th>
                        <th className="border px-2 py-2">Phone Number</th>
                        <th className="border px-2 py-2">Number of Parcels Booked</th>
                        <th className="border px-2 py-2">Total Spent Amount</th>
                        <th className="border px-2 py-2">Make Delivery Man</th>
                        <th className="border px-2 py-2">Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td className="border px-2 py-2">{index + 1}</td>
                            <td className="border px-2 py-2">{user.name}</td>
                            <td className="border px-2 py-2 text-center">{user.phoneNumber ? user.phoneNumber : <><p className='text-red-300'>No Booking Yet</p></>}</td>
                            <td className="border px-2 py-2 text-center">{user.parcelsBooked ? user.parcelsBooked : <><p className='text-red-300 '>00</p></>}</td>
                            {/* Logic to calculate total spent amount */}
                            <td className="border px-2 py-2">{/* Display total spent amount */}</td>
                            <td className="border px-2 py-2">
                                <button
                                    onClick={() => makeDeliveryMan(user)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                >
                                    Make Delivery Man
                                </button>
                            </td>
                            <td className="border px-2 py-2">
                                <button
                                    onClick={() => makeAdmin(user)}
                                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                                >
                                    Make Admin
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



            {/* <div className="mt-4">
                <ul className="flex justify-center space-x-2">
                    {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => paginate(index + 1)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div> */}


        </div>
    );
};

export default AllUser;

