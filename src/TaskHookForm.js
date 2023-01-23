import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      people: false,
      status: "yapılacak",
    },
    mode: "onChange",
  });
  const onSubmit = (data) => {
    let id = nanoid();
    submitFn({ ...data, id });
  };
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          {...register("title", {
            required: true,
            minLength: {
              value: 3,
              message: "3 Karakterden fazla olmalıdır",
            },
          })}
          className="input-text"
          id="title"
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          {...register("description", {
            required: true,
            minLength: {
              value: 10,
              message: "10 Karakterden fazla olmalıdır",
            },
          })}
          className="input-textarea"
          rows="3"
          id="description"
        ></textarea>
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  required: "Lütfen bir kisi seciniz.",
                })}
              />
              {p}
            </label>
          ))}
          {errors.people && <p>{errors.people.message}</p>}{" "}
        </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
