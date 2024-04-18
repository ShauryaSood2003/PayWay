import { Card } from "@repo/ui/card"

export const P2PTransaction = ({
    transactions
}: {
    transactions: {
        amount:number,
        timestamp:Date,
        fromUserId:number,
        toUserId:number,
        currentUser:number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent P2P Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent P2P Transactions">
        <div className="pt-2 ">
            {
                transactions.map(t => 
                    <div className={`flex justify-between m-2 font-bold ${(t.toUserId===t.currentUser)?"text-green-500":"text-red-600"}`}>
                        <div>
                            <div className="text-sm">
                                {
                                    (t.toUserId===t.currentUser)?
                                    "Received INR"
                                    :
                                    "Send INR"
                                }
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            {
                                (t.toUserId===t.currentUser)?
                                "+ "
                                :
                                "- "
                            }
                           Rs {t.amount / 100}
                        </div>

                    </div>
            )}
        </div>
    </Card>
}