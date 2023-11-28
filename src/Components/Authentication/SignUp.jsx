import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import signUp from "../../assets/signUp.json";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";



const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    /* const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        setSignUpError('');

        // Password validation rules
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Weak Password',
                footer: 'Password should be at least 8 characters long and contain at least one lowercase, uppercase letter, digit, and special character (!@#$%^&*()_+).'
            })
            setSignUpError(
                'Password should be at least 8 characters long and contain at least one lowercase, uppercase letter, digit, and special character (!@#$%^&*()_+).'
            );
            return;
        }
        else if (!accepted) {
            setSignUpError("Please, Accept or Terms & Conditions");
            Swal.fire(
                'Error?',
                'Please, Accept or Terms & Conditions',
                'question'
            );
            return;
        }

        createUser(email, password)
            .then((result) => {
                const newUser = result.user;
                // Navigate('/')

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Signed Up',
                    showConfirmButton: false,
                    timer: 1500
                })
                // Fetch user information after successful signUp
                axiosInstance.post('/user', { email, name });


                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                        console.log('profile updated')
                        console.log(newUser);

                        // location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!!!',
                            footer: 'Please try again'
                        })
                    })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!!!',
                    footer: 'Please try again'
                })
            })
    } */

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL, data.role)
                    .then(() => {
                        console.log(data);
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            image: data.photoURL
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div>
            <Helmet>
                <title>Parcel Tracker | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen w-10/12 m-auto my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left flex-1 ">
                        <Lottie animationData={signUp} loop={true} />
                    </div>
                    <div className="flex-1 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <div className="card-body">
                            <h1 className="text-5xl font-bold py-2">SignUp now!</h1>


                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text"  {...register("photoURL", { required: true })} name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Role</span>
                                    </label>
                                    <select {...register("role", { required: true })} name="role" className="select select-bordered">
                                        <option value="User">User</option>
                                        <option value="DeliveryMen">Delivery Man</option>
                                    </select>
                                    {errors.role && <span className="text-red-600">Role is required</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                                </div>
                            </form>



                            <p className="text-center">Already have an Account? Please, <strong><Link to="/logIn" className="underline  underline-offset-4">Log In</Link> </strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


