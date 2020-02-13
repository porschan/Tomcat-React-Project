import React, {Component} from 'react';
import {Icon, ListView, NavBar, PullToRefresh,Card, WingBlank, WhiteSpace,List } from 'antd-mobile';
import './index.css';
import ReactDOM from 'react-dom';
import qrpj from 'assets/img/deviceType/wx_dzjc.png';

const Item = List.Item;
const Brief = Item.Brief;

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the weekEat the weekEat the weekEat the weekEat the weekEat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}

export default class extends Component {

    state = {
        record: null,
        disabled: false,
    };

    constructor(prop) {
        super(prop);
        // let temp = getInitData();
        // temp.then((resData) => {
        //   const {status, data} = resData;
        //   if (parseInt(status) === 0) {
        //     console.log(data);
        //   }
        // }).catch((errData) => {
        //   console.log(errData);
        // });


        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
    };

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(genData()),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        }, 1500);
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = [...this.rData, ...genData(++pageIndex)];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (

                <div key={rowID}
                     style={{
                         padding: '0 15px',
                         backgroundColor: 'white',
                     }}
                >
                    <List className="my-list">
                        {/*<Item>Title</Item>*/}
                        {/*<Item arrow="horizontal" onClick={() => {}}>Title</Item>*/}
                        {/*<Item extra="extra content" arrow="horizontal" onClick={() => {}}>Title</Item>*/}
                        <Item extra="10:30" align="top" thumb={qrpj} multipleLine>
                            这里名称有可能超级长。。。
                        </Item>
                    </List>
                </div>

            );
        };

        return (

            <div>

                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        console.info('onLeftClick')
                        history.back();
                    }}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    ]}
                >处理工单</NavBar>

                <div>
                    <ListView
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}

                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        useBodyScroll={this.state.useBodyScroll}
                        style={this.state.useBodyScroll ? {} : {
                            height: this.state.height,
                            // border: '1px solid #ddd',
                            // margin: '5px 0',
                        }}
                        pullToRefresh={<PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        onEndReached={this.onEndReached}
                        pageSize={5}
                    />
                </div>

            </div>

        );
    }
}
