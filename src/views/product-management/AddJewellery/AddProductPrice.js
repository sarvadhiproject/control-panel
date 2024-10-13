import React from 'react'
import { Form, Input, Button } from 'antd'

const AddProductPrice = ({ onNext, onPrev, formData, setFormData }) => {
    const handleSubmit = (values) => {
        setFormData({ ...formData, ...values })
        onNext()
    }

    return (
        <Form onFinish={handleSubmit} initialValues={formData}>
            {/* <Form.Item name="mrp" label="MRP" rules={[{ required: true }]}>
                <Input
                    type="number"
                    style={{ width: '220px', height: '35px' }}
                />
            </Form.Item> */}
            {/* <Form.Item
                name="selling_price"
                label="Selling Price"
                rules={[{ required: true }]}
            >
                <Input
                    type="number"
                    style={{ width: '220px', height: '35px' }}
                />
            </Form.Item> */}
            <Form.Item
                name="making_charges"
                label="Making Charges"
                rules={[
                    {
                        required: true,
                        message: 'Making charges are required.',
                    },
                    {
                        pattern: /^\d{1,2}(\.\d+)?$/,
                        message:
                            'Please enter a valid value (up to two digits before the decimal).',
                    },
                ]}
            >
                <Input
                    type="number" // Changed to number to enforce numeric input
                    placeholder="Percentage value (e.g. 12.25)"
                    style={{ width: '220px', height: '35px' }}
                />
            </Form.Item>
            <Form.Item
                name="vendor_price"
                label="Vendor Price"
                rules={[{ required: true }]}
            >
                <Input
                    type="number"
                    style={{ width: '220px', height: '35px' }}
                />
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
                            borderColor: '#832729',
                            borderRadius: '4px',
                            width: '80px',
                        }}
                    >
                        Next
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default AddProductPrice
