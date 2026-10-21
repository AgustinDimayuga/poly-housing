import Textarea from "./textarea"

type ImportantInformationProps = {
    viewerRole?: "realtor" | "user"
    information?: string
}

const sampleInformation = "This home is available for a 12-month lease starting September 1, 2027. Trash collection and yard maintenance are included in the rent, and residents are responsible for other utilities. Two off-street parking spaces and covered bike storage are available. Please reach out with your group size and preferred move-in date to arrange a tour or ask any questions."

export default function ImportantInformation({
    viewerRole = "user",
    information = sampleInformation,
}: ImportantInformationProps) {
    return (
        <section aria-labelledby="important-information-title" className="bg-white rounded-2xl border border-border-inputs p-6">
            <h2 id="important-information-title" className="text-xl font-bold">Important information</h2>
            {viewerRole === "realtor" ? (
                <div className="mt-4">
                    <Textarea
                        id="property-extra-information"
                        name="extraInformation"
                        rows={5}
                        defaultValue={information}
                        placeholder="Write a short paragraph with any extra details prospective residents should know."
                        className="text-sm leading-relaxed"
                    >
                        Extra information
                    </Textarea>
                </div>
            ) : (
                <p className="mt-3 text-sm leading-relaxed text-under-input whitespace-pre-line">
                    {information}
                </p>
            )}
        </section>
    )
}
