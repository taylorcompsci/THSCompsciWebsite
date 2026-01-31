interface QuestionProps {
    question: string;
    answer: string;
}

export default function Question({ question, answer }: QuestionProps)
{
    return (
        <div className="w-150 group">
            <div className="p-3 border border-white w-full transition-all hover:bg-white hover:text-background">
                <h4 className="text-2xl">{question}</h4>
            </div>
            <div className="border border-t-0 border-white transition-[height] overflow-hidden h-0 opacity-0 group-hover:h-50 group-hover:p-3 group-hover:opacity-100 w-full">
                {answer}
            </div>
        </div>
    )
}