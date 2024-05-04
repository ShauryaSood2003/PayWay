
import { Card } from "@repo/ui/card"


export const MerchantTransactions = ({
    transactions
}: {
    transactions: {
        amount:number,
        time:Date,
        toUserId:number,
        currentUser:number
    }[]
}) => {
    
    if (!transactions.length) {
        return <Card title="Recent Merchant Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Merchant transactions
            </div>
        </Card>
    }
    return <Card title="Recent Banks Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between text-red-500 font-semibold m-2">
                <div>
                    <div className="text-sm">
                        Send to Merchant with ID : {t.toUserId}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center ">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}