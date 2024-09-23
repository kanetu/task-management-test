import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type UserInfoFormValues = {
  name: string;
  email: string;
  age: number;
  address: string;
  gender: string;
};

const UserInfoForm: React.FC = () => {
  const { handleSubmit, control } = useForm<UserInfoFormValues>();

  const { t } = useTranslation();

  const onSubmit = (data: UserInfoFormValues) => {
    // Handle the form data submission (e.g., send it to a server)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {t("global.welcome")}
      <div>
        <label>Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Age</label>
        <Controller
          name="age"
          control={control}
          rules={{ required: true, min: 0, max: 150 }}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>
      <div>
        <label>Address</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInfoForm;
