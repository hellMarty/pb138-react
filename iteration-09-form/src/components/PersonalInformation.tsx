import React, { FC } from "react";
import '../styles/PersonalInformation.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface IPersonalProps {
    nextAction: Function;
}

interface InputData {
    email: string;
    firstName: string;
    surname: string;
    prePhone: string;
    phoneNumber: number;
    street: string;
    streetNo: string;
    city: string;
    zipCode: number;
    note: string;
}

const schema = yup.object().shape({
    firstName: yup.string().required("Please enter name").min(4, "Minimum 4 characters"),
    surname: yup.string().required("Please enter surname").min(4, "Minimum 4 characters"),
    street: yup.string().required("Please enter street").min(4, "Minimum 4 characters"),
    streetNo: yup.string().required("Required"),
    city: yup.string().required(),
    zipCode: yup.number().required().positive().min(10000).max(99999),
    phoneNumber: yup.number().required().positive().min(100000000).max(999999999),
    email: yup.string().email()
}).required();
  
export const PersonalInformation: FC<IPersonalProps> = ({ nextAction, setData }) => {
    const { register, handleSubmit, formState } = useForm({resolver: yupResolver(schema)});
    const onSubmit = (data: InputData) => { setData(data); nextAction(2);  };
    const { errors } = formState;


    return (
        <div className="main">
            <h2>Step 2: Persoal Information</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="label">First Name
                        <input className={`${errors.firstName ? 'invalid' : ''}`} {...register("firstName")} />
                    </label>
                    {errors.firstName && <span className="invalid-message">{errors.firstName.message}</span>}
                </div>
                <div>
                    <label className="label">Surname
                        <input className={`${errors.surname ? 'invalid' : ''}`} {...register("surname")} />
                    </label>
                    {errors.surname && <span className="invalid-message">{errors.surname.message}</span>}
                </div>
                <div className="label--line">
                    <div>
                        <label className="label--long">Street
                            <input className={`${errors.street ? 'invalid' : ''}`} {...register("street")} />
                        </label>
                        {errors.street && <span className="invalid-message">{errors.street.message}</span>}
                    </div>
                    <div>
                        <label className="label--short">Street No.
                            <input className={`${errors.streetNo ? 'invalid' : ''}`} {...register("streetNo")} />
                        </label>
                        {errors.streetNo && <span className="invalid-message">{errors.streetNo.message}</span>}
                    </div>
                </div>
                <div className="label--line">
                <label className="label--long">City
                    <input className={`${errors.city ? 'invalid' : ''}`} {...register("city")} />
                </label>
                <label className="label--short">Zip Code
                    <input className={`${errors.zipCode ? 'invalid' : ''}`} {...register("zipCode")} />
                </label>
                </div>
                <div className="label--line">
                    <label className="label--short">Phone no.
                        <select style={{height: "1.4rem"}} {...register("prePhone")}>
                            <option value="+420">+420</option>
                            <option value="+421">+421</option>
                        </select>
                    </label>
                    <label className="label--long">
                        <input className={`${errors.phoneNumber ? 'invalid' : ''}`} {...register("phoneNumber")} />
                    </label>
                </div>
                <div>
                    <label className="label">Email
                        <input className={`${errors.email ? 'invalid' : ''}`} {...register("email")} />
                    </label>
                    {errors.email && <span className="invalid-message">{errors.email.message}</span>}
                </div>
                <label className="label note">Note
                    <textarea {...register("note")} />
                </label>
                
                <input type="submit" value="Next"/>
            </form>
        </div>
    );
  };
  