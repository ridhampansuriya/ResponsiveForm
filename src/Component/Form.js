import React, {useEffect, useState} from 'react';
import {
    Col, Row, Input,
    Table,
    Radio,
    Button,
    Select,
    DatePicker,
} from 'antd';
import moment from 'moment'
import {EyeTwoTone, EditTwoTone, DeleteTwoTone} from '@ant-design/icons';
import "./Form.scss"

const BasicForm = () => {
    const {Option} = Select;
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
    let array = [];
    useEffect(() => {
        array  = JSON.parse(localStorage.getItem("studentsData")).length > 0 ? JSON.parse(localStorage.getItem("studentsData")) : [];
    }, [])
    useEffect(() => {
        setData(array);
    }, [])


    const onChange = (e, name) => {
        const {value} = e.target;
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
        if (userValue.gender !== "" && userValue.studentName !== "" && userValue.email !== "" && userValue.rollNo !== "") {
            if (isEdit) {
                const temp = JSON.parse(JSON.stringify(data));
                temp.splice(isEdit, 1, userValue);
                setData(temp);
                localStorage.setItem("studentsData", JSON.stringify(temp));
                setIsEdit("");
            } else {
                array.push(userValue);
                setData([...data, userValue]);
                localStorage.setItem("studentsData", JSON.stringify([...data, userValue]));
            }
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

    const DeleteData = async (i) => {
        const temp = JSON.parse(JSON.stringify(data));
        temp.splice(i, 1)
        localStorage.setItem("studentsData", JSON.stringify(temp));
        setData(temp);
    }
    const editeData = (i) => {
        const temp = JSON.parse(JSON.stringify(data[i]));
        setUserValue(temp);
        setIsEdit(i);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
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
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, i) => (
                <div className="icons">
                    {/*<a>Invite {record.name}</a>*/}
                    <EyeTwoTone style={{fontSize: '23px'}}/>
                    <EditTwoTone twoToneColor="#9a9a9a" style={{fontSize: '23px', color: '#eb2f96'}}
                                 onClick={() => editeData(i)}/>
                    <DeleteTwoTone twoToneColor="rgb(255 0 0)" style={{fontSize: '23px'}}
                                   onClick={() => DeleteData(i)}/>
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
                <Col xs={{span: 21, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Input placeholder="Enter Your Name" id="studentName" value={userValue.studentName || ""}
                           onChange={(e) => onChange(e, "studentName")} size={'large'}/>
                </Col>
            </Row>


            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="rollNo"> Roll NO.:</label>
                </Col>
                <Col xs={{span: 21, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Input placeholder="Basic usage" id="rollNo" value={userValue.rollNo || ""}
                           onChange={(e) => onChange(e, "rollNo")} size={'large'}/>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="email"> Email:</label>
                </Col>
                <Col xs={{span: 21, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Input placeholder="Basic usage" id="email" value={userValue.email || ""}
                           onChange={(e) => onChange(e, "email")} size={'large'}/>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="branch"> Branch:</label>
                </Col>
                <Col xs={{span: 21, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Select
                        id="branch"
                        placeholder="Select Branch"
                        style={{width: 200}}>
                        {getBranch()}
                    </Select>
                </Col>
            </Row>


            <Row className="inputBox">
                <Col xs={{span: 20, offset: 1}} sm={{span: 7, offset: 2}} md={{span: 5, offset: 5}}
                     lg={{span: 5, offset: 6}} xl={6}>
                    <label for="gender"> Gender:</label>
                </Col>
                <Col xs={{span: 21, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <Radio.Group
                        onChange={(e) => onChange(e, "gender")}
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
                <Col xs={{span: 21, offset: 1}} sm={{span: 12, offset: 0}} md={9} lg={8} xl={7}>
                    <DatePicker format={dateFormatList} id="dob"
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
                <Col xs={{span: 22, offset: 1}} sm={{span: 20, offset: 2}} md={{span: 20, offset: 2}}
                     lg={{span: 20, offset: 2}} xl={{span: 20, offset: 2}}>
                    <div className="tabel">
                        <Table
                            bordered
                            dataSource={data}
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