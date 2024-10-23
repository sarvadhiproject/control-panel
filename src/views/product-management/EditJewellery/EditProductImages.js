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
    const [certificationFileList, setCertificationFileList] = useState([])
    const [imagesToRemove, setImagesToRemove] = useState([]) // State for images to remove
    const [removeCertification, setRemoveCertification] = useState(false) // State for removing certification file

    useEffect(() => {
        fetchExistingImages(productId)
        fetchCertificationFile(productId)
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

            console.log('Certification file response:', response.data)

            if (response.data.data.certification_file) {
                const certificationFilePath =
                    response.data.data.certification_file
                const fullCertificationFileUrl = `${appConfig.cloudinaryPrefix}/${certificationFilePath}`

                setCertificationFileList([
                    {
                        uid: certificationFilePath,
                        name: certificationFilePath.split('/').pop(),
                        status: 'done',
                        url: fullCertificationFileUrl,
                    },
                ])
            }
        } catch (error) {
            console.error('Error fetching certification file:', error)
        }
    }

    const handleUpload = ({ fileList }) => {
        setFileList(fileList)
        form.validateFields(['p_images'])
    }

    const handleRemoveImage = (file) => {
        setFileList((prevList) =>
            prevList.filter((item) => item.uid !== file.uid)
        )
        console.log('FILE : ', file)
        setImagesToRemove((prevRemoveList) => [
            ...prevRemoveList,
            file.name, // Assuming the name is unique for removal
        ])
    }

    const handleUploadCertification = ({ fileList }) => {
        setCertificationFileList(fileList)
        form.validateFields(['certification_file'])
    }

    const handleRemoveCertification = () => {
        setCertificationFileList([])
        setRemoveCertification(true) // Mark certification file for removal
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

            formDataToSend.append(
                'images_to_remove',
                JSON.stringify(imagesToRemove) // Send images to remove
            )

            if (removeCertification) {
                formDataToSend.append('remove_certification', true) // Mark certification file for removal
            }

            const response = await axios.put(
                `${appConfig.apiPrefix}/products/update/${productId}`,
                formDataToSend
            )

            if (response.status === 200) {
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
                    onRemove={handleRemoveImage} // Use custom remove handler
                    accept="image/*"
                    beforeUpload={() => false}
                >
                    <div>
                        <UploadOutlined style={{ fontSize: '20px' }} />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>

            {/* 
            // With edit certificate functionality

            <Form.Item label="Certification File" name="certification_file">
                <Upload
                    listType="picture-card"
                    fileList={certificationFileList}
                    onChange={handleUploadCertification}
                    accept="image/*"
                    beforeUpload={() => false}
                    maxCount={1}
                    onRemove={handleRemoveCertification} // Handle removal
                >
                    <div>
                        <UploadOutlined style={{ fontSize: '20px' }} />
                        <div style={{ marginTop: 8 }}>Upload Certification</div>
                    </div>
                </Upload>
            </Form.Item> */}

            <Form.Item label="Certification File" name="certification_file">
                <Upload
                    listType="picture-card"
                    fileList={certificationFileList}
                    accept="image/*"
                    beforeUpload={() => false}
                    maxCount={1}
                    showUploadList={{ showRemoveIcon: false }} // Disable remove icon to prevent updates
                ></Upload>
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
