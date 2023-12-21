import React, { useState, useEffect } from "react";
import { publicIpv4 } from "public-ip";
import { isBrowser, isMobile } from "react-device-detect";
import { wrapper } from "../../store/reducers/store";
import { getGlobalElements } from "../../store/actions/commonAction";
import { drupal } from "../../lib/drupal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import swal2 from "sweetalert2";
import Layout from "../../components/layout";
import Link from "next/link";
import api from "../../shared/api";
import InnerHeroSection from "@/components/innerHeroSection";

const ContactUs = ({ node }) => {
  const [userTrakingData, setUserTrakingData] = useState({});

  useEffect(() => {
    userTraking();
    console.log("node > ", node);
  }, []);

  const userTraking = async () => {
    try {
      setUserTrakingData({
        ip_address: await publicIpv4(),
        device_type: isBrowser ? "Web" : isMobile ? "Mobile" : " ",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    fname: "",
    lname: "",
    emailID: "",
    phoneNo: "",
    gender: "Male",
    state: "",
    city: "",
    sub: "",
    msg: "",
    terms_condition: false,
  };

  const validateRequestCallBack = Yup.object().shape({
    fname: Yup.string()
      .trim()
      .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
      .min(1, "Name cannot be less than 1 character long")
      .max(40, "Name cannot be more than 40 characters long")
      .required("Please enter first name"),

    lname: Yup.string()
      .trim()
      .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
      .min(2, "Name cannot be less than 2 character long")
      .max(40, "Name cannot be more than 40 characters long")
      .required("Please enter last name"),

    emailID: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter valid email id"
      )
      .required("Please enter email id"),

    phoneNo: Yup.string()
      .trim()
      .matches(
        /^[6789]\d{9}$/,
        "Please enter valid 10 digits mobile no. without +91"
      )
      .required("Please enter mobile no"),

    sub: Yup.string()
      .trim()
      .min(10, "Name cannot be less than 10 character long")
      .required("Please enter your specific subject"),

    msg: Yup.string()
      .trim()
      .min(10, "Name cannot be less than 10 character long")
      .required("Please enter your message"),

    terms_condition: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // const handleSubmitEvent = async (values, actions) => {
  //   let postData = {
  //     fname: values.fname,
  //     lname: values.lname,
  //     emailID: values.emailID,
  //     phoneNo: values.phoneNo,
  //     gender: values.gender,
  //     sub: values.sub,
  //     msg: values.msg,
  //     ip_address: userTrakingData !== null ? userTrakingData.ip_address : "",
  //     device_type: userTrakingData !== null ? userTrakingData.device_type : "",
  //   };

  //   console.log("postData " + JSON.stringify(postData));
  //   try {
  //     await drupal.createResource("node--contact_form_report", {
  //       data: {
  //         attributes: {
  //           title: postData.fname + " " + postData.lname,
  //           field_first_name: {
  //             value: postData.fname,
  //           },
  //           field_last_name: {
  //             value: postData.lname,
  //           },
  //           // Add other fields as needed
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error in handleSubmitEvent:", error);
  //   }
  // };

  const handleSubmitEvent = async (values, actions) => {
    let postData = {
      fname: values.fname,
      lname: values.lname,
      emailID: values.emailID,
      phoneNo: values.phoneNo,
      sub: values.sub,
      msg: values.msg,
      ip_address: userTrakingData !== null ? userTrakingData.ip_address : "",
      device_type: userTrakingData !== null ? userTrakingData.device_type : "",
    };

    let objJsonStr = JSON.stringify(postData);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

    await api
      .post("/common/api/insert-contact-us-form-details.json", objJsonB64)
      .then((response) => {
        if (response.status === 200) {
          const result = response?.data;
          console.log(result);
        }
      })
      .catch((error) => {
        swal2.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went worng. Please try again!`,
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <Layout
      title={node.title}
      description={node.field_meta_description}
      keyword={node.field_meta_keyword}
    >
      <InnerHeroSection
        title={node.title}
        desktop_banner_img={node.field_desktop_banner_image.field_media_image}
      />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div
                dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                className="content"
              />
            </div>
            <div className="col-md-7">
              <div className="form-wrapper">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validateRequestCallBack}
                  onSubmit={handleSubmitEvent}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                    setFieldTouched,
                    isSubmitting,
                  }) => {
                    // console.log("values", values)
                    return (
                      <Form>
                        {errors.success ? (
                          <div className="alert alert-success">
                            {errors.success}
                          </div>
                        ) : null}
                        <fieldset>
                          <legend>Form example</legend>
                          <div className="row">
                            <div className="col-md-6 pb-3">
                              <div className="fname">
                                <label>
                                  First Name <span>*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="fname"
                                  className="form-control"
                                  placeholder="First Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.fname}
                                />
                              </div>
                              <span className="error">
                                {errors.fname && touched.fname && errors.fname}
                              </span>
                            </div>
                            <div className="col-md-6 pb-3">
                              <div className="lname">
                                <label>
                                  Last Name <span>*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="lname"
                                  className="form-control"
                                  placeholder="Last Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.lname}
                                />
                              </div>
                              <span className="error">
                                {errors.lname && touched.lname && errors.lname}
                              </span>
                            </div>
                            <div className="col-md-6 pb-3">
                              <div className="email-id">
                                <label>
                                  Email ID <span>*</span>
                                </label>
                                <Field
                                  type="email"
                                  name="emailID"
                                  className="form-control"
                                  placeholder="Email ID"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.emailID}
                                />
                              </div>
                              <span className="error">
                                {errors.emailID &&
                                  touched.emailID &&
                                  errors.emailID}
                              </span>
                            </div>
                            <div className="col-md-6 pb-3">
                              <div className="phone-no">
                                <label>
                                  Mobile No <span>*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="phoneNo"
                                  className="form-control"
                                  placeholder="Mobile No"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phoneNo}
                                />
                              </div>
                              <span className="error">
                                {errors.phoneNo &&
                                  touched.phoneNo &&
                                  errors.phoneNo}
                              </span>
                            </div>
                            <div className="col-md-2 pb-3">
                              <div className="gender">
                                <label>
                                  Gender <span>*</span>
                                </label>
                                <label>
                                  <Field
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  Male
                                </label>
                                <label>
                                  <Field
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  Female
                                </label>
                              </div>
                              <span className="error">
                                {errors.gender &&
                                  touched.gender &&
                                  errors.gender}
                              </span>
                            </div>
                            <div className="col-md-12 pb-3">
                              <div className="phone-no">
                                <label>
                                  Subject <span>*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="sub"
                                  className="form-control"
                                  placeholder="Subject"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.sub}
                                />
                              </div>
                              <span className="error">
                                {errors.sub && touched.sub && errors.sub}
                              </span>
                            </div>
                            <div className="col-md-12 pb-3">
                              <div className="phone-no">
                                <label>
                                  Message <span>*</span>
                                </label>
                                <Field
                                  type="textarea"
                                  rows={10}
                                  name="msg"
                                  className="form-control"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.msg}
                                />
                              </div>
                              <span className="error">
                                {errors.msg && touched.msg && errors.msg}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-12 pb-3">
                            <div className="terms-condition">
                              <label>
                                <Field
                                  name="terms_condition"
                                  type="checkbox"
                                  checked={values.terms_condition}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "terms_condition",
                                      !values.terms_condition
                                    );
                                  }}
                                />{" "}
                                <div className="terms-condition">
                                  I agree to all{" "}
                                  <Link href={"/terms-condition"}>
                                    Terms &amp; Condition
                                  </Link>
                                </div>
                              </label>
                            </div>
                            <span className="error">
                              {errors.terms_condition &&
                                touched.terms_condition &&
                                errors.terms_condition}
                            </span>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-lg btn-block"
                                >
                                  <span>Submit</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    await store.dispatch(getGlobalElements());

    const node = await drupal.getResource(
      "node--page",
      "0b27e394-bcc3-4a73-8a38-c15047ad9bc4",
      {
        params: {
          "filter[status]": 1,
          "fields[node--page]":
            "title,path,body,field_meta_keyword,field_meta_description,field_desktop_banner_image,field_mobile_banner_image,uid,created",
          include:
            "uid,field_desktop_banner_image.field_media_image,field_mobile_banner_image.field_media_image",
        },
      }
    );

    let complete = "ok";
    return {
      props: { complete, node },
      revalidate: 60,
    };
  }
);

export default ContactUs;
