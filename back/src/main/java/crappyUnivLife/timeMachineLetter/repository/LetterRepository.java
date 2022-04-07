package crappyUnivLife.timeMachineLetter.repository;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class LetterRepository {

    @PersistenceContext
    private final EntityManager em;

    public void save(Letter letter) {
        em.persist(letter);
    }

    public Letter findOne(Long id) {
        return em.find(Letter.class, id);
    }

    public List<Letter> getLetterList(Long memberId) {
        return em.createQuery("select l from Letter l where l.member.Id = :memberId", Letter.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public Letter findByHash(String hash) {
        return em.createQuery("select l from Letter l where l.hash =:hash", Letter.class)
                .setParameter("hash", hash)
                .getSingleResult();
    }
}
