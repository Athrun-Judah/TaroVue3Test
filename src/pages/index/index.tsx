import { ScrollView, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { defineComponent, reactive, ref } from "vue";

let testList = [
    {
        title: 1
    },
    {
        title: 2
    },
    {
        title: 3
    },
    {
        title: 4
    },
    {
        title: 5
    },
    {
        title: 6
    },
    {
        title: 7
    },
]

export default defineComponent({
    name:'Home',
    setup(){
        const { windowHeight } = Taro.getSystemInfoSync()
        const Threshold = 20
        const state = reactive({
            tabValue:'0'
        })

        const allData = ref(testList)
        const unconfirmedData = ref(testList)
        const unfinishedData = ref(testList)
        const finishedData = ref(testList)
        const obj = reactive({
            allDataPageNum:2,
            unconfirmedPageNum:2,
            unfinishedPageNum:2,
            finishedPageNum:2
        })

        const tabList = (allData:any,unconfirmed:any,unfinished:any,finished:any) => {

            let list = [
                {
                    key:1,
                    title:'全部',
                    list: allData
                },
                {
                    key:2,
                    title:'待确认',
                    list: unconfirmed
                },
                {
                    key:3,
                    title:'未完成',
                    list:  unfinished
                },
                {
                    key:4,
                    title:'已完成',
                    list: finished
                }
            ]
            return list
        }

        const acqScrollData = (pageNum:number,title:string) => {
            //axios 获取四个数据的列表
            console.log(pageNum , title);
        }

        const onScrollToLower = (props:string) => {
            let reqScroll:any = action.get(props)
            reqScroll![2].call()
        }

        const action = new Map([
            ['全部',[obj.allDataPageNum,allData,() => acqScrollData(obj.allDataPageNum,'全部')]],
            ['待确认',[obj.unconfirmedPageNum,unconfirmedData,() => acqScrollData(obj.unconfirmedPageNum,'待确认')]],
            ['未完成',[obj.unfinishedPageNum,unfinishedData,() => acqScrollData(obj.unfinishedPageNum,'未完成')]],
            ['已完成',[obj.finishedPageNum,finishedData,() => acqScrollData(obj.finishedPageNum,'已完成')]]

        ])


        return() => (
            <View>
                <nut-tabs v-model={state.tabValue} color="#e82050">
                        {tabList(allData.value,unconfirmedData.value,unfinishedData.value,finishedData.value).reduce((pre:JSX.Element[] , item:any):JSX.Element[] => {
                            pre.push(
                                <nut-tabpane key={item.key} title={item.title} class="p-0">
                                    <ScrollView
                                        scrollY
                                        scrollWithAnimation
                                        upperThreshold={Threshold}
                                        lowerThreshold={Threshold}
                                        onScrollToLower={() =>onScrollToLower(item.title)}
                                        style={{height:`${windowHeight - 100}px`}}
                                        // onScroll={(e) => console.log(e.detail)}
                                    >
                                        {item.list.reduce((pre:JSX.Element[] , cur:any):JSX.Element[] =>{
                                            pre.push(   
                                                    //<CellModel /> 自己封装的card组件
                                                    <View>
                                                        <View>{cur.title}</View>
                                                        <View>{cur.title}</View>
                                                        <View>{cur.title}</View>
                                                        <View>{cur.title}</View>
                                                        <View>{cur.title}</View>
                                                        <View>{cur.title}</View>
                                                        <View>{cur.title}</View>
                                                    </View>
                                                )
                                            return pre
                                        },[] )}
                                    </ScrollView>
                                </nut-tabpane>
                            )
                            return pre
                        },[])}
                    </nut-tabs>
            </View>
        )
    }
})