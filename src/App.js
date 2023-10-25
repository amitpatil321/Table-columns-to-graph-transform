import React, { Component } from "react";
import { Table, Row, Col } from "antd";
import { SelectableGroup, createSelectable } from "react-selectable-fast";

import "react-table-drag-select/style.css";

import "./App.css";

const PrintData = ({ selectableRef, isSelected, isSelecting, children }) => {
  return (
    <div ref={selectableRef} className={isSelected ? "selected" : null}>
      {children}
    </div>
  );
};

const SelectableComponent = createSelectable(PrintData);

class App extends Component {
  state = {
    dragStart: false,
    tableFormat: [],
    selectedKeys: [],
    dataObj: [],
  };

  handleSelection = (selectedKeys) => {
    this.setState({ selectedKeys }, () => {
      let dataArr = [];
      selectedKeys.map((each) => {
        const { selectableKey, children } = each.props;
        const [id, column] = selectableKey.split("-");
        dataArr.push({ id: id, [column]: children });
      });
      const result = Object.values(
        dataArr.reduce((grouped, item) => {
          const { id, ...rest } = item;
          if (!grouped[id]) {
            grouped[id] = { id };
          }
          Object.assign(grouped[id], rest);
          return grouped;
        }, {})
      );
    });
  };

  resetSelection = (selectedKeys) => {
    this.setState({ selectedKeys: [] });
  };

  data = [
    {
      id: 4151240,
      objectId: "12660",
      missingField: "address",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: 16645,
      completedAt: null,
    },
    {
      id: 4151239,
      objectId: "12660",
      missingField: "nickname",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.421458Z",
    },
    {
      id: 4151241,
      objectId: "12660",
      missingField: "warranty",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151242,
      objectId: "12660",
      missingField: "ownership",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151243,
      objectId: "12660",
      missingField: "linked_loans",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151244,
      objectId: "12660",
      missingField: "owner_contacts",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151245,
      objectId: "12660",
      missingField: "homeowners_insurances",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151234,
      objectId: "54084",
      missingField: "valuable_type",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.276448Z",
    },
    {
      id: 4151235,
      objectId: "54084",
      missingField: "nickname",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.293531Z",
    },
    {
      id: 4151236,
      objectId: "54084",
      missingField: "photo",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151237,
      objectId: "54084",
      missingField: "description",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151238,
      objectId: "54084",
      missingField: "owner_contacts",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151229,
      objectId: "54083",
      missingField: "valuable_type",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Phone",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.138311Z",
    },
    {
      id: 4151230,
      objectId: "54083",
      missingField: "nickname",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Phone",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.154620Z",
    },
    {
      id: 4151231,
      objectId: "54083",
      missingField: "photo",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Phone",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
  ];

  getIndex = (record) => this.data.findIndex((x) => x.id === record.id);

  componentDidMount() {
    window.localStorage.setItem("data", JSON.stringify([]));
  }

  handleTouchEndWindow = (event) => {
    this.setState({ dragStart: true });
    // console.log(event.target);
  };

  onCellClick = (record, event) => {
    const { dragStart, tableFormat } = this.state;
    this.setState((prevState) => {
      return {
        dragStart: !prevState.dragStart,
        tableFormat: [...tableFormat, record.id],
      };
    });
  };

  onMouseDown = (record, event) => {
    // console.log(record, event);
    this.setState({ dragStart: true });
  };
  onMouseUp = () => {
    this.setState({ dragStart: false });
  };
  dragging = (event, record) => {
    const { dragStart } = this.state;
    // if (dragStart) console.log(record.id);
  };

  render = () => {
    const { selectedKeys: selectedData } = this.state;
    let columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "nickname",
        key: "nickname",
        render(text, record, index) {
          const { dataObj } = this.state;
          let selected = selectedData.indexOf(`${record.id}-nickname`) > -1;
          return {
            props: {
              className: dataObj.filter((each) => each.id === record.id)
                ? "selected"
                : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-nickname`}
              >
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
      {
        title: "Missing Field",
        dataIndex: "missingField",
        key: "missingField",
        render(text, record, index) {
          let selected = selectedData.indexOf(`${record.id}-missingField`) > -1;
          return {
            props: {
              className:
                selectedData.indexOf(`${record.id}-missingField`) > -1
                  ? "selected"
                  : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-missingField`}
              >
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
      {
        title: "Object Type",
        dataIndex: "objectType",
        key: "objectType",
        render(text, record, index) {
          let selected = selectedData.indexOf(`${record.id}-objectType`) > -1;
          return {
            props: {
              className:
                selectedData.indexOf(`${record.id}-objectType`) > -1
                  ? "selected"
                  : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-objectType`}
              >
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render(text, record, index) {
          let selected = selectedData.indexOf(`${record.id}-status`) > -1;
          return {
            props: {
              className:
                selectedData.indexOf(`${record.id}-status`) > -1
                  ? "selected"
                  : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-status`}
              >
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
    ];
    return (
      <Row>
        <Col span={4} />
        <Col span={16}>
          <button onClick={this.resetSelection}>Reset</button>
          <SelectableGroup onSelectionFinish={this.handleSelection}>
            <Table
              id="table"
              rowKey={(record) => record.id}
              // onRow={(record, rowIndex) => {
              //   return {
              //     onMouseDown: (event) => this.handleCell(record, rowIndex, event),
              //     onClick: (event) => {
              //       console.log("hello");
              //     }, // click row
              //   };
              // }}
              columns={columns}
              dataSource={this.data}
            />
          </SelectableGroup>
        </Col>
        <Col span={4} />
      </Row>
    );
  };
}

export default App;
