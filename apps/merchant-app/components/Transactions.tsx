import { Card } from "@repo/ui/card"

export const Transactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Banks Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Bank transactions
            </div>
        </Card>
    }
    return <Card title="Recent Banks Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between text-green-500 font-semibold m-2">
                <div>
                    <div className="text-sm">
                        Received from {t.provider}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}