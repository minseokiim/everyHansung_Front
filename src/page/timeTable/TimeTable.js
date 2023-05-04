import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import apiClient from "../../apiClient";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("과목명을 입력해주세요."),
  day: Yup.string().required("요일을 선택해주세요."),
  startTime: Yup.string().required("시작 시간을 입력해주세요."),
  endTime: Yup.string().required("종료 시간을 입력해주세요."),
});

const TimeTable = () => {
  const studentId = localStorage.getItem("studentId");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { startTime, endTime } = values;
      const timestampStartTime = new Date(`${new Date().toDateString()} ${startTime}`).toISOString();
      const timestampEndTime = new Date(`${new Date().toDateString()} ${endTime}`).toISOString();
      const timestampValues = {
        ...values,
        startTime: timestampStartTime,
        endTime: timestampEndTime,
      };

      const response = await apiClient.post(
        "http://localhost:8080/time",
        timestampValues
      );

      if (response.status === 200) {
        alert("입력 되었습니다.");
      } else {
        console.error("실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="p-3">
      <strong className="p-3">시간표 입력</strong>
      <hr />
      <Formik
        initialValues={{
          subject: "",
          day: "",
          startTime: "",
          endTime: "",
          studentId,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="p-3">
            <label htmlFor="subject">*과목명: &nbsp; </label>
            <Field name="subject" type="text" className="comment-input" />
            {errors.subject && touched.subject ? (
              <div>{errors.subject}</div>
            ) : null}
            <br /> <br />
            <label htmlFor="day">*요일: &nbsp; </label>
            <Field name="day" as="select" className="comment-input">
              <option value="">선택하세요</option>
              <option value="mon">월요일</option>
              <option value="tue">화요일</option>
              <option value="wed">수요일</option>
              <option value="thu">목요일</option>
              <option value="fri">금요일</option>
            </Field>
            {errors.day && touched.day ? <div>{errors.day}</div> : null}
            <br /> <br />
            <label htmlFor="startTime">*시작 시간:&nbsp; </label>
            <Field name="startTime" type="time" className="comment-input" />
            {errors.startTime && touched.startTime ? (
              <div>{errors.startTime}</div>
            ) : null}
            <br /> <br />
            <label htmlFor="endTime">*종료 시간:&nbsp; </label>
            <Field name="endTime" type="time" className="comment-input" />
            {errors.endTime && touched.endTime ? (
              <div>{errors.endTime}</div>
            ) : null}
            <br /> <br />
            <button type="submit" disabled={isSubmitting} className="button">
              제출
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TimeTable;
