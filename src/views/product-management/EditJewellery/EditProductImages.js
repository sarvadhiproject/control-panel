// import React, { useState, useEffect } from 'react'
// import { Form, Upload, Button, message, Spin } from 'antd'
// import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
// import appConfig from 'configs/app.config'
// import { Notification, toast } from 'components/ui'
// import axios from 'axios'

// const EditProductImages = ({
//     onPrev,
//     formData,
//     setFormData,
//     onSubmit,
//     productId,
// }) => {
//     const [fileList, setFileList] = useState([])
//     const [form] = Form.useForm()
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         fetchExistingImages(productId)
//     }, [productId])

//     const fetchExistingImages = async (productId) => {
//         try {
//             const response = await axios.get(
//                 `${appConfig.apiPrefix}/products/details/${productId}`
//             )

//             if (
//                 response.data.message === 'Product details fetched successfully'
//             ) {
//                 const existingImages = response.data.data.imageURLs.map(
//                     (imageURL) => ({
//                         uid: imageURL,
//                         name: imageURL.split('/').pop(),
//                         status: 'done',
//                         url: imageURL,
//                     })
//                 )
//                 setFileList(existingImages)
//             } else {
//                 console.error('Error fetching product details:', response.data)
//                 toast.push(
//                     <Notification
//                         title={'Failed to fetch product details'}
//                         type="danger"
//                         duration={2500}
//                     >
//                         {response.data}
//                     </Notification>,
//                     {
//                         placement: 'top-center',
//                     }
//                 )
//             }
//         } catch (error) {
//             console.error('Error fetching existing images:', error)
//             toast.push(
//                 <Notification
//                     title={'Error fetching existing images'}
//                     type="danger"
//                     duration={2500}
//                 >
//                     {error}
//                 </Notification>,
//                 {
//                     placement: 'top-center',
//                 }
//             )
//         }
//     }
//     const handleUpload = ({ fileList }) => {
//         setFileList(fileList)
//         form.validateFields(['p_images'])
//     }

//     const handlePreview = (file) => {
//         if (file.type && file.type.startsWith('image/')) {
//             // Handle preview for local file objects
//             const reader = new FileReader()
//             reader.onload = () => {
//                 const imageUrl = reader.result
//                 if (imageUrl) {
//                     const newTab = window.open(imageUrl)
//                     if (newTab) {
//                         newTab.focus()
//                     } else {
//                         message.error(
//                             'Unable to open a new tab. Please check your browser settings.'
//                         )
//                     }
//                 } else {
//                     message.error('Failed to generate preview')
//                 }
//             }
//             reader.readAsDataURL(file.originFileObj)
//         } else if (file.url) {
//             // Handle preview for existing images from the server
//             const newTab = window.open(file.url)
//             if (newTab) {
//                 newTab.focus()
//             } else {
//                 message.error(
//                     'Unable to open a new tab. Please check your browser settings.'
//                 )
//             }
//         } else {
//             message.error('Only image files can be previewed')
//         }
//     }

//     const handleSubmit = async () => {
//         try {
//             setLoading(true)
//             const formDataToSend = new FormData()
//             Object.keys(formData).forEach((key) => {
//                 formDataToSend.append(key, formData[key])
//             })

//             const newFilesToUpload = fileList.filter((file) => !file.url)
//             newFilesToUpload.forEach((file) => {
//                 const fileObject = new File([file.originFileObj], file.name, {
//                     type: file.type,
//                 })
//                 formDataToSend.append('p_images', fileObject)
//             })

//             const existingImageNames = fileList
//                 .filter((file) => file.url)
//                 .map((file) => file.name)

//             formDataToSend.append(
//                 'existingImages',
//                 JSON.stringify(existingImageNames)
//             ) // Send existing image names to backend

//             const response = await axios.put(
//                 `${appConfig.apiPrefix}/products/update/${productId}`,
//                 formDataToSend
//             )

//             if (response.status === 200) {
//                 // message.success('Product updated successfully')
//                 toast.push(
//                     <Notification
//                         title={'Successfully updated'}
//                         type="success"
//                         duration={2500}
//                     >
//                         Product updated successfully
//                     </Notification>,
//                     {
//                         placement: 'top-center',
//                     }
//                 )
//                 onSubmit()
//             } else {
//                 const data = response.data
//                 // message.error(data.error || 'Failed to update product')
//                 toast.push(
//                     <Notification
//                         title={'Failed to update product'}
//                         type="danger"
//                         duration={2500}
//                     >
//                         {data.error} - Please try again later
//                     </Notification>,
//                     {
//                         placement: 'top-center',
//                     }
//                 )
//             }
//             setLoading(false)
//         } catch (error) {
//             // message.error('Failed to update product:', error)
//             toast.push(
//                 <Notification
//                     title={'Failed to update product'}
//                     type="danger"
//                     duration={2500}
//                 >
//                     We are experiencing some technical difficulties. Please wait
//                     or try reloading the page.
//                 </Notification>,
//                 {
//                     placement: 'top-center',
//                 }
//             )
//             setLoading(false)
//         }
//     }

//     return (
//         <Form onFinish={handleSubmit}>
//             <Form.Item label="Product Images" name="p_images">
//                 <Upload
//                     listType="picture-card"
//                     fileList={fileList}
//                     onChange={handleUpload}
//                     onPreview={handlePreview}
//                     accept="image/*"
//                     beforeUpload={() => false}
//                     onRemove={(file) => {
//                         setFileList((prevList) =>
//                             prevList.filter((item) => item.uid !== file.uid)
//                         )
//                     }}
//                 >
//                     <div>
//                         <UploadOutlined style={{ fontSize: '20px' }} />
//                         <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                 </Upload>
//             </Form.Item>
//             <Form.Item>
//                 <div
//                     style={{
//                         display: 'flex',
//                         marginTop: '20px',
//                         justifyContent: 'space-between',
//                     }}
//                 >
//                     <Button onClick={onPrev}>Previous</Button>
//                     <Button
//                         type="primary"
//                         htmlType="submit"
//                         style={{
//                             // background: '#1890ff',
//                             // borderColor: '#1890ff',
//                             background: '#832729',
//                             borderRadius: '4px',
//                             width: '80px',
//                         }}
//                     >
//                         {loading ? (
//                             <Spin
//                                 indicator={
//                                     <LoadingOutlined
//                                         style={{
//                                             fontSize: 22,
//                                             color: 'white',
//                                         }}
//                                         spin
//                                     />
//                                 }
//                             />
//                         ) : (
//                             'Submit'
//                         )}
//                     </Button>
//                 </div>
//             </Form.Item>
//         </Form>
//     )
// }

// export default EditProductImages

import React, { useState, useEffect } from 'react'
import { Form, Upload, Button, message, Spin } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import appConfig from 'configs/app.config'
import { Notification, toast } from 'components/ui'
import axios from 'axios'

const EditProductImages = ({
    onPrev,
    formData,
    setFormData,
    onSubmit,
    productId,
}) => {
    const [fileList, setFileList] = useState([])
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [certificationFileList, setCertificationFileList] = useState([]) // State for certification file list

    useEffect(() => {
        fetchExistingImages(productId)
        fetchCertificationFile(productId) // Fetch existing certification file
    }, [productId])

    const fetchExistingImages = async (productId) => {
        try {
            const response = await axios.get(
                `${appConfig.apiPrefix}/products/details/${productId}`
            )

            if (
                response.data.message === 'Product details fetched successfully'
            ) {
                const existingImages = response.data.data.imageURLs.map(
                    (imageURL) => ({
                        uid: imageURL,
                        name: imageURL.split('/').pop(),
                        status: 'done',
                        url: imageURL,
                    })
                )
                setFileList(existingImages)
            } else {
                console.error('Error fetching product details:', response.data)
                toast.push(
                    <Notification
                        title={'Failed to fetch product details'}
                        type="danger"
                        duration={2500}
                    >
                        {response.data}
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
        } catch (error) {
            console.error('Error fetching existing images:', error)
            toast.push(
                <Notification
                    title={'Error fetching existing images'}
                    type="danger"
                    duration={2500}
                >
                    {error}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const fetchCertificationFile = async (productId) => {
        try {
            const response = await axios.get(
                `${appConfig.apiPrefix}/products/details/${productId}`
            )

            // Log the response to check if certificationFile is present
            console.log('Certification file response:', response.data)

            if (response.data.data.certification_file) {
                const certificationFilePath =
                    response.data.data.certification_file
                const fullCertificationFileUrl = `https://res.cloudinary.com/dyjgvi4ma/image/upload/${certificationFilePath}`

                setCertificationFileList([
                    {
                        uid: certificationFilePath,
                        name: certificationFilePath.split('/').pop(),
                        status: 'done',
                        url: fullCertificationFileUrl, // Use the full URL
                    },
                ])
            }
        } catch (error) {
            console.error('Error fetching certification file:', error)
            // Handle error (optional)
        }
    }

    const handleUpload = ({ fileList }) => {
        setFileList(fileList)
        form.validateFields(['p_images'])
    }

    const handlePreview = (file) => {
        if (file.type && file.type.startsWith('image/')) {
            // Handle preview for local file objects
            const reader = new FileReader()
            reader.onload = () => {
                const imageUrl = reader.result
                if (imageUrl) {
                    const newTab = window.open(imageUrl)
                    if (newTab) {
                        newTab.focus()
                    } else {
                        message.error(
                            'Unable to open a new tab. Please check your browser settings.'
                        )
                    }
                } else {
                    message.error('Failed to generate preview')
                }
            }
            reader.readAsDataURL(file.originFileObj)
        } else if (file.url) {
            // Handle preview for existing images from the server
            const newTab = window.open(file.url)
            if (newTab) {
                newTab.focus()
            } else {
                message.error(
                    'Unable to open a new tab. Please check your browser settings.'
                )
            }
        } else {
            message.error('Only image files can be previewed')
        }
    }

    const handleUploadCertification = ({ fileList }) => {
        setCertificationFileList(fileList) // Update state for certification file
        form.validateFields(['certification_file']) // Validate the new field
    }

    const handlePreviewCertification = (file) => {
        if (file.type && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = () => {
                const imageUrl = reader.result
                if (imageUrl) {
                    const newTab = window.open()
                    newTab.document.write(
                        `<img src="${imageUrl}" style="max-width: 100%; max-height: 100%;" />`
                    )
                } else {
                    message.error('Failed to generate preview')
                }
            }
            reader.readAsDataURL(file.originFileObj)
        } else {
            message.error('Only image files can be previewed')
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formDataToSend = new FormData()
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key])
            })

            const newFilesToUpload = fileList.filter((file) => !file.url)
            newFilesToUpload.forEach((file) => {
                const fileObject = new File([file.originFileObj], file.name, {
                    type: file.type,
                })
                formDataToSend.append('p_images', fileObject)
            })

            const existingImageNames = fileList
                .filter((file) => file.url)
                .map((file) => file.name)

            formDataToSend.append(
                'existingImages',
                JSON.stringify(existingImageNames)
            ) // Send existing image names to backend

            certificationFileList.forEach((file) => {
                const fileObject = new File([file.originFileObj], file.name, {
                    type: file.type,
                })
                formDataToSend.append('certification_file', fileObject) // Append certification file
            })

            const response = await axios.put(
                `${appConfig.apiPrefix}/products/update/${productId}`,
                formDataToSend
            )

            if (response.status === 200) {
                // message.success('Product updated successfully')
                toast.push(
                    <Notification
                        title={'Successfully updated'}
                        type="success"
                        duration={2500}
                    >
                        Product updated successfully
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                onSubmit()
            } else {
                const data = response.data
                // message.error(data.error || 'Failed to update product')
                toast.push(
                    <Notification
                        title={'Failed to update product'}
                        type="danger"
                        duration={2500}
                    >
                        {data.error} - Please try again later
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
            setLoading(false)
        } catch (error) {
            // message.error('Failed to update product:', error)
            toast.push(
                <Notification
                    title={'Failed to update product'}
                    type="danger"
                    duration={2500}
                >
                    We are experiencing some technical difficulties. Please wait
                    or try reloading the page.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            setLoading(false)
        }
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Product Images" name="p_images">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleUpload}
                    onPreview={handlePreview}
                    accept="image/*"
                    beforeUpload={() => false}
                    onRemove={(file) => {
                        setFileList((prevList) =>
                            prevList.filter((item) => item.uid !== file.uid)
                        )
                    }}
                >
                    <div>
                        <UploadOutlined style={{ fontSize: '20px' }} />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Certification File"
                name="certification_file"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please upload a certification file',
                //     },
                // ]} // Required validation
            >
                <Upload
                    listType="picture-card"
                    fileList={certificationFileList} // Use the new state
                    onChange={handleUploadCertification} // Handle upload for certification file
                    onPreview={handlePreviewCertification} // Add preview handler
                    accept="image/*"
                    beforeUpload={() => false}
                >
                    <div>
                        <UploadOutlined style={{ fontSize: '20px' }} />
                        <div style={{ marginTop: 8 }}>Upload Certification</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '20px',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button onClick={onPrev}>Previous</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            // background: '#1890ff',
                            // borderColor: '#1890ff',
                            background: '#832729',
                            borderRadius: '4px',
                            width: '80px',
                        }}
                    >
                        {loading ? (
                            <Spin
                                indicator={
                                    <LoadingOutlined
                                        style={{
                                            fontSize: 22,
                                            color: 'white',
                                        }}
                                        spin
                                    />
                                }
                            />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default EditProductImages
