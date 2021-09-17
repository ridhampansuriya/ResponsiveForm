import React, {useEffect, useState} from 'react';
import {
    Col,
    Row,
    Input,
    Table,
    Radio,
    Button,
    Select,
    DatePicker,
    Modal
} from 'antd';
import moment from 'moment'
import {EyeTwoTone, EditTwoTone, DeleteTwoTone, UpOutlined, DownOutlined } from '@ant-design/icons';
import "./Form.scss"

const BasicForm = () => {


    const [userValue, setUserValue] = useState({
        studentName: "",
        gender: "",
        email: "",
        rollNo: "",
        branch: "",
        dob: "",
    })
    const [isEdit, setIsEdit] = useState();
    const [data, setData] = useState();
    const [filterData, setFilterData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState({visible:false,id:""});
    const {Option} = Select;
    const { Search } = Input;
    let array = [];

    const shorting = (value) =>{
        let array = value;
        array = array.map((item,i)=>{
            item.key = i+1;
            return item;
        });
        array = array.sort((a,b)=> a.key - b.key);
        return array;
    }
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("studentsData"));
        array = Array.isArray(data) && data.length > 0 ? data : [];

        // array = array.map((item,i)=>{
        //     item.key = i+1;
        //     return item;
        // });
        array =  shorting(array);
    }, [])
    useEffect(() => {
        setData(array);
    }, [])

    const onChange = (value, name) => {
        console.log("event", value)
        setUserValue({
            ...userValue,
            [name]: value,
        })
    };

    const branch = ['IT', 'Meachanical', 'Chemical', 'Production', 'Civl', 'Power Electronics', 'Electrical']
    const getBranch = () => {
        const branchData = [];
        branch.forEach((item, i) => {
            branchData.push(<Option key={i} value={item}>{item}</Option>);
        })
        return branchData;
    }
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const onSubmit = () => {
        if (userValue.gender.trim() !== 0 && userValue.studentName !== "" && userValue.email !== "" && userValue.rollNo !== "" && userValue.dob && userValue.branch !== "") {
            if (typeof isEdit === "number") {
                let temp = JSON.parse(JSON.stringify(data));
                temp.splice(isEdit, 1, userValue);
                temp = shorting(temp)
                setData(temp);
                localStorage.setItem("studentsData", JSON.stringify(temp));
                setIsEdit("");
            } else {
                let temp = JSON.parse(JSON.stringify(data));
                temp.push(userValue);
                temp =  shorting(temp)
                setData(temp);
                // setData([...data, userValue]);
                localStorage.setItem("studentsData", JSON.stringify([...data, userValue]));
            }
            setUserValue({
                studentName: "",
                gender: "",
                email: "",
                rollNo: "",
                branch: "",
                dob: "",
            })
        }

    }

    const DeleteData = async (i) => {
        let temp = JSON.parse(JSON.stringify(data));
        temp.splice(i, 1);
        temp =  shorting(temp);
        localStorage.setItem("studentsData", JSON.stringify(temp));
        setData(temp);
    }
    const editeData = (i) => {
        const temp = JSON.parse(JSON.stringify(data[i]));
        setUserValue(temp);
        setIsEdit(i);
    }
    const onSearch = (value) => {
        let temp = JSON.parse(JSON.stringify(data));
        if(value) {
            let result = temp.filter(item => item.studentName.trim().toLowerCase().includes(value.trim().toLowerCase()));
            setFilterData(result);
        }else {
            setFilterData([]);
            setData(temp);
        }
    };

    const sorting = (index,newindex) =>{
        let temp = JSON.parse(JSON.stringify(data));
        let tempKey = temp[newindex-1].key;
        temp[newindex-1].key = temp[index-1].key;
        temp[index-1].key = tempKey;
        temp.sort((a,b)=> a.key - b.key);
        setData(temp);
        localStorage.setItem("studentsData", JSON.stringify(temp));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'Roll NO.',
            dataIndex: 'rollNo',
            key: 'rollNo',
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'Date of Birth',
            key: 'dob',
            dataIndex: 'dob',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, i) => (
                <div className="icons">
                    {console.log("recored",record)}
                    {/*<a>Invite {record.name}</a>*/}
                    <EyeTwoTone style={{fontSize: '23px'}} onClick={()=>setIsModalVisible({id: record.key-1,visible:true})}/>
                    <EditTwoTone twoToneColor="#9a9a9a" style={{fontSize: '23px', color: '#eb2f96'}}
                                 onClick={() => editeData(record.key-1)}/>
                    <DeleteTwoTone twoToneColor="rgb(255 0 0)" style={{fontSize: '23px'}}
                                   onClick={() => DeleteData(i)}/>
                    {record.key  > 1 ? <UpOutlined onClick={() =>sorting(record.key,record.key-1)}/> : <>&nbsp; &nbsp;</>}
                    {record.key !== data.length ? <DownOutlined onClick={() =>sorting(record.key,record.key+1)}/> : <>&nbsp; &nbsp;</> }
                    {/*<DeleteOutlined />*/}
                </div>
            ),
        },
    ];

    return (
        <div className="outerBox">
            <Row className="inputBox">
                <Col xs={{offset: 6}} sm={{span: 7, offset: 10}} md={{span: 5, offset: 10}} lg={{span: 6, offset: 10}}
                     xl={6}>
                    <Col span={6}>
                        <div><h1>Registration</h1></div>
                    </Col>
                </Col>
            </Row>


            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="studentName">Name.:</label>
                </Col>
                <Col xs={{span: 22, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Input placeholder="Enter Your Name" id="studentName" value={userValue.studentName || ""}
                           onChange={(e) => onChange(e.target.value, "studentName")} size={'large'}/>
                </Col>
            </Row>


            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="rollNo"> Roll NO.:</label>
                </Col>
                <Col xs={{span: 22, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Input placeholder="Basic usage" id="rollNo" value={userValue.rollNo || ""}
                           onChange={(e) => onChange(e.target.value, "rollNo")} size={'large'}/>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="email"> Email:</label>
                </Col>
                <Col xs={{span: 22, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Input placeholder="Basic usage" id="email" value={userValue.email || ""}
                           onChange={(e) => onChange(e.target.value, "email")} size={'large'}/>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="branch"> Branch:</label>
                </Col>
                <Col xs={{span: 22, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Select
                        id="branch"
                        placeholder="Select Branch"
                        style={{width: 200}}
                        value={userValue.branch || ""}
                        onChange={(value)=>onChange(value, "branch")}
                    >
                        {getBranch()}
                    </Select>
                </Col>
            </Row>


            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="gender"> Gender:</label>
                </Col>
                <Col xs={{span: 22, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Radio.Group
                        onChange={(e) => onChange(e.target.value, "gender")}
                        value={userValue.gender || ""} id="gender">
                        <Radio value='Male'>Male</Radio>
                        <Radio value='Female'>Female</Radio>
                        <Radio value='Other'>Other</Radio>
                    </Radio.Group>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="dob"> Date of Birth:</label>
                </Col>
                <Col xs={{span: 22, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <DatePicker format={dateFormatList} id="dob"
                                value={userValue && userValue.dob && moment(userValue.dob,'DD/MM/YYYY')}
                                onChange={(date,dateString)=>onChange(date && date.format('L'), "dob")}
                    />
                </Col>
            </Row>

            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <Button type="primary" shape="squer" className="submit-btn"onClick={onSubmit}>
                        {typeof isEdit === "number" ? 'Update' : 'Submit'}
                    </Button>
                </Col>
            </Row>

            <row>
                <Col xs={{span: 22, offset: 1}} sm={{span: 11, offset: 11}} md={{span: 8, offset: 14}}
                     lg={{span: 7, offset: 15}} xl={{span: 6, offset: 16}}>
                    <Search placeholder="input search text"
                            onChange={(e)=>onSearch(e.target.value)}
                            onSearch={(value)=>onSearch(value)} enterButton />
                </Col>
            </row>
            <Modal title="Student Details" visible={isModalVisible.visible}
                   // onOk={handleOk}
                onCancel={()=>setIsModalVisible({...isModalVisible,visible : false})}
                   footer={null}
            >
                <div className="box"><div className="tages"><b>Name:</b></div><div className="details">{isModalVisible.visible && data[isModalVisible.id].studentName}</div></div>
                <div className="box"><div className="tages"><b>Branch:</b></div><div className="details">{isModalVisible.visible && data[isModalVisible.id].branch}</div></div>
                <div className="box"><div className="tages"><b>Roll No:</b></div><div className="details">{isModalVisible.visible && data[isModalVisible.id].rollNo}</div></div>
                <div className="box"><div className="tages"><b>Gender:</b></div><div className="details">{isModalVisible.visible && data[isModalVisible.id].gender}</div></div>
                <div className="box"><div className="tages"><b>Date of Birth:</b></div><div className="details">{isModalVisible.visible && data[isModalVisible.id].dob}</div></div>
                <div className="box"><div className="tages"><b>Email:</b></div><div className="details">{isModalVisible.visible && data[isModalVisible.id].email}</div></div>
            </Modal>
            <row>
                <Col xs={{span: 22, offset: 1}} sm={{span: 20, offset: 2}} md={{span: 20, offset: 2}}
                     lg={{span: 20, offset: 2}} xl={{span: 20, offset: 2}}>
                    <div className="tabel">
                        <Table
                            bordered
                            dataSource={filterData.length > 0 ? filterData : data}
                            columns={columns}
                            rowClassName="editable-row"
                        />
                    </div>
                </Col>
            </row>
        </div>
    )
}
export default BasicForm;