import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {MdOutlineClose} from "react-icons/md";

interface DetailPostIs {
    isOpen: boolean;
    onClose: () => void;
    post: any;
}

const DetailPostModal: React.FC<DetailPostIs> = ({
                                                     isOpen,
                                                     onClose,
                                                     post,
                                                 }) => {
    Modal.setAppElement("#__next");

    const [imageUrl, setImageUrl] = useState<string>("");
    // @ts-ignore
    console.log(post, isOpen)
    useEffect(() => {
        if (post && isOpen) {
            // @ts-ignore
            setImageUrl(post?.image);
        }
    }, [post]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Chi tiết bài viết"
                overlayClassName="overlay"
                ariaHideApp={true}
            >
                <div className="modal min-w-screen min-h-screen animated fadeIn faster fixed left-0 top-0 flex
                 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-white ">

                    <div
                        className="absolute py-3 px-6 bg-cover  bg-center opacity-80 inset-0 z-0"
                        style={{
                            backgroundImage: `url('/assets/defaut-img/bg-admin.jpg')`,
                            backgroundSize: "cover",
                            backgroundAttachment: "fixed"
                        }}>
                        <div className="overflow-auto  max-w-4xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold"> Chi tiết bài viết</h3>
                                <button className="modal-close" onClick={onClose}>
                                    <MdOutlineClose size="30"/>
                                </button>
                            </div>
                            <div
                                className="max-h-[80vh] overflow-y-auto mt-4 border-2 container"
                                style={{ maxHeight: '80vh' }}>
                                <div className="mt-6">
                                    <h2 className="flex justify-center text-neutral-900 mt-4 dark:text-neutral-200 text-4xl"
                                        // @ts-ignore
                                    >{post?.title}
                                    </h2>
                                    <span className="flex items-end justify-end"> <h5
                                        className="flex text-neutral-900 mb-4 mt-4 dark:text-neutral-200 text-xl"
                                        // @ts-ignore
                                    >{post?.typePost?.name}
                                </h5></span>
                                    <img src={imageUrl} alt="Loadding.."/>
                                    <article
                                        className="mt-5 prose max-w-none prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 text-left text-justify">
                                        {post?.content}
                                    </article>
                                </div>
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase p-[0.2rem] py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DetailPostModal;
