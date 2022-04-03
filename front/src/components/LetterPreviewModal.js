import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closePreviewModal } from '../store/global';
import LetterView from './LetterView';

function LetterPreviewModal() {
  const data = useSelector((state) => state.letter.singleLetter);
  const previewModalVisible = useSelector((state) => state.global.previewModal);
  const dispatch = useDispatch();
  return (
    <Modal
      width="100%"
      title=""
      style={{
        height: '100vh',
        margin: 0,
        top: 0,
        maxWidth: 'unset',
      }}
      visible={previewModalVisible}
      onCancel={() => dispatch(closePreviewModal())}
      footer={null}
    >
      <LetterView data={data} />
    </Modal>
  );
}
export default LetterPreviewModal;
