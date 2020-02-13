/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, {Component} from 'react';
import {Icon, NavBar,Modal, List, Button, WhiteSpace, WingBlank, InputItem} from 'antd-mobile';
import './index.css';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}


export default class extends Component {

    state = {
        record: null,
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


        this.state = {
            modal1: false,
            modal2: false,
        };
    };

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    render() {

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
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.showModal('modal2')}/>,
                    ]}
                >我要报障</NavBar>

                <h1>测试modal - 弹出框</h1>


                <WingBlank>

                    {/*<Button onClick={this.showModal('modal2')}>popup</Button>*/}
                    <WhiteSpace />
                    <Modal
                        popup
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        animationType="slide-up"
                        afterClose={() => { console.info('afterClose'); }}
                    >
                        <List renderHeader={() => <div>委托买入</div>} className="popup-list">
                            {/*{['股票名称', '股票代码', '买入价格'].map((i, index) => (*/}
                            {/*    <List.Item key={index}>*/}
                            {/*        <InputItem clear placeholder="displayed clear while typing" >{i}</InputItem>*/}
                            {/*    </List.Item>*/}
                            {/*))}*/}

                            <InputItem clear placeholder="displayed clear while typing" >A</InputItem>
                            <InputItem clear placeholder="displayed clear while typing" >B</InputItem>
                            <InputItem clear placeholder="displayed clear while typing" >C</InputItem>
                            <InputItem clear placeholder="displayed clear while typing" >D</InputItem>
                            <List.Item>
                                <Button type="primary" onClick={this.onClose('modal2')}>买入</Button>
                            </List.Item>
                        </List>
                    </Modal>
                </WingBlank>

            </div>



        );
    }
}
