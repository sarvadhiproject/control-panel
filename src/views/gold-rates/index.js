// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Table, Empty, Spin } from 'antd'
// import appConfig from 'configs/app.config'
// import { LoadingOutlined } from '@ant-design/icons'
// import { HiRefresh } from 'react-icons/hi'
// import { Button, Notification, toast } from 'components/ui'
// import moment from 'moment'

// function GoldRates() {
//     const [goldRates, setGoldRates] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(false)

//     const fetchGoldRates = async () => {
//         setLoading(true)
//         setError(false) // Reset error state before fetching
//         try {
//             const response = await axios.get(
//                 `${appConfig.DotNetapiPrefix}/GoldRates`
//             )
//             setGoldRates(response?.data || [])
//         } catch (err) {
//             setError(true) // Set error state on failure
//             toast.push(
//                 <Notification
//                     title={'Failed to fetch gold rates'}
//                     type="danger"
//                     duration={2500}
//                 >
//                     {err?.message} - Please try again later
//                 </Notification>,
//                 {
//                     placement: 'top-center',
//                 }
//             )
//         } finally {
//             setLoading(false)
//         }
//     }

//     const updateGoldPrice = async () => {
//         // {{ edit_1 }}
//         setLoading(true)
//         try {
//             await axios.get(`${appConfig.apiPrefix}/update-gold-price`) // Call the update API
//             await fetchGoldRates() // Fetch gold rates again after updating
//         } catch (err) {
//             setError(true) // Set error state on failure
//             toast.push(
//                 <Notification
//                     title={'Failed to refresh gold price'}
//                     type="danger"
//                     duration={2500}
//                 >
//                     {err?.message} - Please try again later
//                 </Notification>,
//                 {
//                     placement: 'top-center',
//                 }
//             )
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchGoldRates() // Fetch gold rates on component mount
//     }, [])

//     const sortedGoldRates = [...goldRates].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     )

//     return (
//         <>
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '20px',
//                 }}
//             >
//                 <h3 style={{ color: '#832729' }}>Gold Rates (Per Gram)</h3>
//                 {!error && (
//                     <Button
//                         block
//                         onClick={updateGoldPrice}
//                         variant="solid"
//                         style={{ width: '150px', backgroundColor: '#832729' }}
//                         icon={<HiRefresh />}
//                     >
//                         Refresh Rates
//                     </Button>
//                 )}
//             </div>
//             {loading ? (
//                 <Spin
//                     indicator={
//                         <LoadingOutlined
//                             style={{ fontSize: 28, color: '#832729' }}
//                             spin
//                         />
//                     }
//                 />
//             ) : goldRates.length > 0 ? (
//                 <Table
//                     dataSource={sortedGoldRates} // Sorted gold rates
//                     rowKey="goldRateId"
//                     size="small"
//                     columns={[
//                         {
//                             title: '#',
//                             dataIndex: 'goldRateId',
//                             key: 'goldRateId',
//                             render: (text, record, index) => (
//                                 <span style={{ color: '#666' }}>
//                                     {index + 1}
//                                 </span>
//                             ),
//                         },
//                         {
//                             title: '24K',
//                             dataIndex: 'priceGram24k',
//                             key: 'priceGram24k',
//                         },
//                         {
//                             title: '22K',
//                             dataIndex: 'priceGram22k',
//                             key: 'priceGram22k',
//                         },
//                         {
//                             title: '21K',
//                             dataIndex: 'priceGram21k',
//                             key: 'priceGram21k',
//                         },
//                         {
//                             title: '20K',
//                             dataIndex: 'priceGram20k',
//                             key: 'priceGram20k',
//                         },
//                         {
//                             title: '18K',
//                             dataIndex: 'priceGram18k',
//                             key: 'priceGram18k',
//                         },
//                         {
//                             title: '16K',
//                             dataIndex: 'priceGram16k',
//                             key: 'priceGram16k',
//                         },
//                         {
//                             title: '14K',
//                             dataIndex: 'priceGram14k',
//                             key: 'priceGram14k',
//                         },
//                         {
//                             title: '10K',
//                             dataIndex: 'priceGram10k',
//                             key: 'priceGram10k',
//                         },
//                         {
//                             title: 'Currency',
//                             dataIndex: 'currency',
//                             key: 'currency',
//                         },
//                         {
//                             title: 'Created At',
//                             dataIndex: 'createdAt',
//                             key: 'createdAt',
//                             render: (text) =>
//                                 moment(text).format('DD/MM/YYYY, HH:mm:ss'),
//                         },
//                     ]}
//                     onRow={(record, index) => ({
//                         style: {
//                             backgroundColor: index === 0 ? 'yellow' : '', // Highlight the first row
//                         },
//                     })}
//                 />
//             ) : (
//                 <Empty
//                     style={{ fontWeight: '350' }}
//                     description="No gold rates available"
//                 />
//             )}
//         </>
//     )
// }

// export default GoldRates

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Empty, Spin } from 'antd'
import appConfig from 'configs/app.config'
import { LoadingOutlined } from '@ant-design/icons'
import { HiRefresh } from 'react-icons/hi'
import { Button, Notification, toast } from 'components/ui'
import moment from 'moment'

function GoldRates() {
    const [goldRates, setGoldRates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchGoldRates = async () => {
        setLoading(true)
        setError(false) // Reset error state before fetching
        try {
            const response = await axios.get(
                `${appConfig.DotNetapiPrefix}/GoldRates`
            )
            setGoldRates(response?.data || [])
        } catch (err) {
            setError(true) // Set error state on failure
            toast.push(
                <Notification
                    title={'Failed to fetch gold rates'}
                    type="danger"
                    duration={2500}
                >
                    {err?.message} - Please try again later
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } finally {
            setLoading(false)
        }
    }

    const updateGoldPrice = async () => {
        setLoading(true)
        try {
            await axios.get(`${appConfig.apiPrefix}/update-gold-price`) // Call the update API
            await fetchGoldRates() // Fetch gold rates again after updating

            // Display toast notification after successful update
            toast.push(
                <Notification
                    title={'Current rate fetched'}
                    type="success"
                    duration={2500}
                >
                    Gold rates has been updated and Product rates on the website
                    have been updated accordingly!
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } catch (err) {
            setError(true)
            toast.push(
                <Notification
                    title={'Failed to refresh gold price'}
                    type="danger"
                    duration={2500}
                >
                    {err?.message} - Please try again later
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGoldRates() // Fetch gold rates on component mount
    }, [])

    const sortedGoldRates = [...goldRates].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <h3 style={{ color: '#832729' }}>Gold Rates (Per Gram)</h3>
                {!error && (
                    <Button
                        block
                        onClick={updateGoldPrice}
                        variant="solid"
                        style={{
                            width: '150px',
                            backgroundColor: '#832729',
                            transition: 'background-color 0.3s ease', // Smooth hover effect
                        }}
                        icon={<HiRefresh />}
                        onMouseEnter={
                            (e) => (e.target.style.backgroundColor = '#6b1f1e') // Darken on hover
                        }
                        onMouseLeave={
                            (e) => (e.target.style.backgroundColor = '#832729') // Revert to original color
                        }
                    >
                        Refresh Rates
                    </Button>
                )}
            </div>
            {loading ? (
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{ fontSize: 28, color: '#832729' }}
                            spin
                        />
                    }
                />
            ) : goldRates.length > 0 ? (
                <Table
                    dataSource={sortedGoldRates} // Sorted gold rates
                    rowKey="goldRateId"
                    size="small"
                    columns={[
                        {
                            title: '#',
                            dataIndex: 'goldRateId',
                            key: 'goldRateId',
                            render: (text, record, index) => (
                                <span style={{ color: '#666' }}>
                                    {index + 1}
                                </span>
                            ),
                        },
                        {
                            title: '24K',
                            dataIndex: 'priceGram24k',
                            key: 'priceGram24k',
                        },
                        {
                            title: '22K',
                            dataIndex: 'priceGram22k',
                            key: 'priceGram22k',
                        },
                        {
                            title: '21K',
                            dataIndex: 'priceGram21k',
                            key: 'priceGram21k',
                        },
                        {
                            title: '20K',
                            dataIndex: 'priceGram20k',
                            key: 'priceGram20k',
                        },
                        {
                            title: '18K',
                            dataIndex: 'priceGram18k',
                            key: 'priceGram18k',
                        },
                        {
                            title: '16K',
                            dataIndex: 'priceGram16k',
                            key: 'priceGram16k',
                        },
                        {
                            title: '14K',
                            dataIndex: 'priceGram14k',
                            key: 'priceGram14k',
                        },
                        {
                            title: '10K',
                            dataIndex: 'priceGram10k',
                            key: 'priceGram10k',
                        },
                        {
                            title: 'Currency',
                            dataIndex: 'currency',
                            key: 'currency',
                        },
                        {
                            title: 'Created At',
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: (text) =>
                                moment(text).format('DD/MM/YYYY, HH:mm:ss'),
                        },
                    ]}
                    onRow={(record, index) => ({
                        style: {
                            backgroundColor: index === 0 ? 'yellow' : '', // Highlight the first row
                        },
                    })}
                />
            ) : (
                <Empty
                    style={{ fontWeight: '350' }}
                    description="No gold rates available"
                />
            )}
        </>
    )
}

export default GoldRates
