export default function DeleteModal({

    open,

    onCancel,

    onConfirm,

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl p-8 w-[420px]">

                <h2 className="text-2xl font-bold">

                    Delete Job?

                </h2>

                <p className="mt-3 text-gray-600">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={onCancel}

                        className="border px-5 py-2 rounded-lg"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        className="bg-red-600 text-white px-5 py-2 rounded-lg"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}