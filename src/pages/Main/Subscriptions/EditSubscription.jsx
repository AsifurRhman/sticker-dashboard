
// import React, { useState } from "react";
// import { Button, Form, Input, message } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import PageHeading from "../../../Components/PageHeading";
// import { PiCurrencyDollar } from "react-icons/pi";
// import Cookies from "js-cookie"; // For getting session token
// import { baseUrl } from "../../../constant/contant"; // Ensure this is your base URL
// import toast from "react-hot-toast";

// const EditSubscription = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get the sticker ID from the URL
//   const [loading, setLoading] = useState(false); // Loading state
//   const [file, setFile] = useState(null); // Store the file here

//   const onFinish = async (values) => {
//     const { name, price, description } = values;

//     const formData = new FormData(); // Create FormData to handle the file upload
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("description", description);

//     if (file) {
//       formData.append("image", file); // Append the image file if it exists
//     }

//     try {
//       setLoading(true); // Start loading
//       const token = Cookies.get("session"); // Assuming you store the session in cookies
//       if (!token) {
//         navigate("/auth");
//         return message.error("please logged in first")
//    }
//       const response = await fetch(`${baseUrl}/sticker/update?id=${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`, // Add auth token if necessary
//         },
//         body: formData, // Send FormData as the request body
//       });

//       const result = await response.json();
//       if (result.success) {
//         message.success("Sticker updated successfully.");
//         navigate("/stickers"); // Navigate back to the stickers list after a successful update
//       } else {
//         message.error(result.message || "Failed to update sticker.");
//       }
//     } catch (error) {
//       console.error("Error updating sticker:", error);
//       message.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile); // Set the file in state
//   };

//   return (
//     <div className="space-y-[24px]">
//       <PageHeading title={"Edit Stickers"} backPath={"/stickers"} />
//       <Form
//         labelCol={{ span: 22 }}
//         wrapperCol={{ span: 40 }}
//         layout="vertical"
//         onFinish={onFinish}
//         autoComplete="off"
//         requiredMark={false}
//         className="min-h-[70vh] flex flex-col justify-between px-[34px] py-[14px]"
//       >
//         <div>
//           <div className="grid grid-cols-2 gap-x-6 font-[cursive]">
//             <Form.Item
//               label={<span className="text-[18px] text-primary font-[cursive]">Stickers Name</span>}
//               name={"name"}
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input Stickers name!",
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="Sticker name"
//                 style={{
//                   height: "56px",
//                   background: "#E8F1EE",
//                 }}
//                 className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
//               />
//             </Form.Item>
//             <Form.Item
//               label={<span className="text-[18px] text-primary font-[cursive]">Price</span>}
//               name={"price"}
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input price!",
//                 },
//               ]}
//             >
//               <Input
//                 prefix={<PiCurrencyDollar className="" size={18} />}
//                 placeholder="Sticker price"
//                 style={{
//                   height: "56px",
//                   background: "#E8F1EE",
//                 }}
//                 className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
//               />
//             </Form.Item>
//           </div>
//           <Form.Item
//             label={<span className="text-[18px] text-primary font-[cursive]">Description</span>}
//             name={"description"}
//             rules={[
//               {
//                 required: true,
//                 message: "Please input description!",
//               },
//             ]}
//           >
//             <Input.TextArea
//               placeholder="Description"
//               style={{
//                 background: "#E8F1EE",
//               }}
//               rows={4}
//               className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
//             />
//           </Form.Item>
//           <Form.Item
//             label={<span className="text-[18px] text-primary font-[cursive]">Upload Stickers</span>}
//             name={"image"}
//             rules={[
//               {
//                 required: false, // Change this to true if image upload is mandatory
//                 message: "Please upload a sticker image!",
//               },
//             ]}
//           >
//             <Input
//               type="file"
//               onChange={handleFileChange} // Handle file selection
//               style={{
//                 background: "#E8F1EE",
//               }}
//               className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
//             />
//           </Form.Item>
//         </div>
//         <Button
//           style={{
//             backgroundColor: "#1D7151",
//             size: "18px",
//             height: "56px",
//             color: "#ffff",
//           }}
//           size="large"
//           htmlType="submit"
//           loading={loading} // Show loading indicator while the form is submitting
//           className="w-full h-[56px] px-2 font-medium rounded-lg "
//         >
//           Update Sticker
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default EditSubscription;



import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../../Components/PageHeading";
import Cookies from "js-cookie"; // For getting session token
import { baseUrl, imageUrl } from "../../../constant/contant"; // Ensure this is your base URL

const EditSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the sticker ID from the URL
  const [loading, setLoading] = useState(false); // Loading state
  const [file, setFile] = useState(null); // Store the file here
  const [sticker, setSticker] = useState(null); // To store the sticker details
  const [formLoading, setFormLoading] = useState(true); // State for form data loading
  const [form] = Form.useForm(); // Form instance



  // Fetch sticker details when the component mounts
  useEffect(() => {
    const fetchSticker = async () => {
      try {
        const token = Cookies.get("session");
        if (!token) {
          navigate("/auth");
          return message.error("Please log in first");
        }

        const response = await fetch(`${baseUrl}/sticker/sticker-detail?id=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
     //   console.log(result.data, "result from edit sticker");
        if (result.success) {
          setSticker(result.data); // Assuming the sticker details are in result.data
          // Dynamically set form values once data is available
          form.setFieldsValue({
            name: result.data.name,
            price: result.data.price,
            description: result.data.description,
            image: result.data.image.publicFileURL,
          });
        } else {
          message.error(result.message || "Failed to fetch sticker details.");
        }
      } catch (error) {
        console.error("Error fetching sticker details:", error);
        message.error("Something went wrong. Please try again.");
      } finally {
        setFormLoading(false); // Form loading ends
      }
    };

    fetchSticker();
  }, [id, navigate, form]);

  const onFinish = async (values) => {
    const { name, price, description } = values;

    const formData = new FormData(); // Create FormData to handle the file upload
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    if (file) {
      formData.append("image", file); // Append the image file if it exists
    }

    try {
      setLoading(true); // Start loading
      const token = Cookies.get("session"); // Assuming you store the session in cookies
      if (!token) {
        navigate("/auth");
        return message.error("Please log in first");
      }

      const response = await fetch(`${baseUrl}/sticker/update?id=${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Add auth token if necessary
        },
        body: formData, // Send FormData as the request body
      });

      const result = await response.json();
      if (result.success) {
        message.success("Sticker updated successfully.");
        navigate("/stickers"); // Navigate back to the stickers list after a successful update
      } else {
        message.error(result.message || "Failed to update sticker.");
      }
    } catch (error) {
      console.error("Error updating sticker:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the file in state
  };

  return (
    <div className="space-y-[24px]">
      <PageHeading title={"Edit Stickers"} backPath={"/stickers"} />
      {formLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Spin size="large" /> {/* Ant Design spinner */}
        </div>
      ) : (
        <Form
          form={form} // Bind the form instance to the form
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
          className="min-h-[70vh] flex flex-col justify-between px-[34px] py-[14px]"
        >
          <div>
            <div className="grid grid-cols-2 gap-x-6 font-[cursive]">
              <Form.Item
                label={<span className="text-[18px] text-primary font-[cursive]">Stickers Name</span>}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Please input Stickers name!",
                  },
                ]}
              >
                <Input
                  placeholder="Sticker name"
                  style={{
                    height: "56px",
                    background: "#E8F1EE",
                  }}
                  className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[18px] text-primary font-[cursive]">Price</span>}
                name={"price"}
                rules={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                ]}
              >
                <Input
                  placeholder="Sticker price"
                  style={{
                    height: "56px",
                    background: "#E8F1EE",
                  }}
                  className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
                />
              </Form.Item>
            </div>
            <Form.Item
              label={<span className="text-[18px] text-primary font-[cursive]">Description</span>}
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Description"
                style={{
                  background: "#E8F1EE",
                }}
                rows={4}
                className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
              />
            </Form.Item>

            <Form.Item>
              {sticker?.image?.publicFileURL && !file && (
                <img
                  src={`${imageUrl}${sticker.image.publicFileURL}`}
                  alt="Sticker Preview"
                  style={{
                    maxWidth: "156px",
                    maxHeight: "164px",
                    marginTop: "8px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  className="drop-shadow-md"
                />
              )}
            </Form.Item>
            <Form.Item 
          >
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Sticker Preview"
                style={{
                  maxWidth: "156px",
                  maxHeight: "164px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                className="drop-shadow-md"
              />
            )}
          </Form.Item>

            <Form.Item
              label={<span className="text-[18px] text-primary font-[cursive]">Upload Stickers<span className="text-sm ">(156 X 164 maximum)</span> </span>}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                type="file"
                onChange={handleFileChange} // Handle file selection
                style={{
                  background: "#E8F1EE",
                }}
                className="outline-none rounded-lg px-[16px] py-[12px] text-[#181414] mt-[8px] text-lg drop-shadow-md"
              />
            </Form.Item>
          </div>
          <Button
            style={{
              backgroundColor: "#1D7151",
              size: "18px",
              height: "56px",
              color: "#ffff",
            }}
            size="large"
            htmlType="submit"
            loading={loading} // Show loading indicator while the form is submitting
            className="w-full h-[56px] px-2 font-medium rounded-lg "
          >
            Update Sticker
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditSubscription;






