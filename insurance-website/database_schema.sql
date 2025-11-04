-- =====================================================
-- Schéma SQL Complet - Assurance Véhicule Professionnel
-- =====================================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS assurance_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE assurance_db;

-- =====================================================
-- Table : devis_request
-- Description : Stocke toutes les demandes de devis
-- =====================================================

CREATE TABLE IF NOT EXISTS devis_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    raison_sociale VARCHAR(255) DEFAULT NULL,
    activite VARCHAR(100) NOT NULL,
    demarrage_activite BOOLEAN NOT NULL DEFAULT FALSE,
    assure_actuellement BOOLEAN NOT NULL DEFAULT FALSE,
    type_transport VARCHAR(50) NOT NULL,
    souhaitez_assurer VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    rgpd_consent BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_type_transport (type_transport)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table : activite
-- Description : Liste des activités professionnelles
-- =====================================================

CREATE TABLE IF NOT EXISTS activite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT DEFAULT NULL,
    icon VARCHAR(50) DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table : garantie_type
-- Description : Types de garanties disponibles
-- =====================================================

CREATE TABLE IF NOT EXISTS garantie_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    tier VARCHAR(50) DEFAULT NULL COMMENT 'simple, etendu, tous_risques',
    base_price DECIMAL(10,2) DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_tier (tier),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table : faq
-- Description : Questions fréquentes
-- =====================================================

CREATE TABLE IF NOT EXISTS faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    reponse TEXT NOT NULL,
    ordre INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_ordre (ordre),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Données de test pour activite
-- =====================================================

INSERT INTO activite (nom, slug, description, icon, is_active) VALUES
('Artisans', 'artisans', 'Plombiers, électriciens, menuisiers, etc.', 'fa-tools', TRUE),
('BTP & Construction', 'btp', 'Entreprises de construction et travaux publics', 'fa-hard-hat', TRUE),
('Commerciaux & professions libérales', 'commerciaux', 'Commerciaux, consultants, professions libérales', 'fa-briefcase', TRUE),
('Déménagement', 'demenagement', 'Entreprises de déménagement', 'fa-truck-moving', TRUE),
('Santé & Services à la personne', 'sante', 'Services de santé et aide à la personne', 'fa-user-nurse', TRUE),
('Transport & Logistique', 'transport', 'Transport de marchandises et logistique', 'fa-truck', TRUE),
('Autre', 'autre', 'Autres activités professionnelles', 'fa-ellipsis-h', TRUE);

-- =====================================================
-- Données de test pour garantie_type
-- =====================================================

INSERT INTO garantie_type (nom, description, tier, base_price, is_active) VALUES
('Responsabilité Civile', 'Couvre les dommages causés à des tiers', 'simple', 50.00, TRUE),
('Protection du Conducteur', 'Protège le conducteur en cas d\'accident', 'simple', 30.00, TRUE),
('Défense Pénale et Recours', 'Assistance juridique en cas de litige', 'simple', 20.00, TRUE),
('Assistance 0 km', 'Dépannage et assistance dès le premier kilomètre', 'simple', 25.00, TRUE),
('Vol / Tentative de vol', 'Couvre le vol du véhicule', 'etendu', 80.00, TRUE),
('Incendie / Explosion', 'Dommages causés par le feu', 'etendu', 60.00, TRUE),
('Bris de Glaces', 'Remplacement des vitres et pare-brise', 'etendu', 40.00, TRUE),
('Catastrophes Naturelles', 'Dommages dus aux catastrophes naturelles', 'etendu', 70.00, TRUE),
('Dommages Tous Accidents', 'Tous dommages au véhicule', 'tous_risques', 120.00, TRUE),
('Vandalisme', 'Actes de vandalisme sur le véhicule', 'tous_risques', 50.00, TRUE),
('Garantie Valeur à Neuf', 'Indemnisation à la valeur neuve', 'tous_risques', 100.00, TRUE),
('Accessoires et Aménagements', 'Couvre les équipements spéciaux', 'tous_risques', 80.00, TRUE);

-- =====================================================
-- Données de test pour faq
-- =====================================================

INSERT INTO faq (question, reponse, ordre, is_active) VALUES
(
    'Quelle est la différence entre une assurance transport de personnes et une assurance transport de marchandises ?',
    'L\'assurance transport de personnes couvre les passagers et le véhicule, tandis que l\'assurance transport de marchandises protège les biens transportés et les camions contre les risques (vol, perte, casse…).',
    1,
    TRUE
),
(
    'L\'assurance marchandises transportées est-elle obligatoire ?',
    'Pas toujours, mais elle est fortement recommandée pour tous les professionnels du transport. Elle garantit la valeur des biens transportés en cas d\'incident pendant le trajet.',
    2,
    TRUE
),
(
    'Peut-on regrouper plusieurs véhicules sous un seul contrat ?',
    'Oui, avec nos formules multivéhicules, vous pouvez assurer votre flotte complète (camions, utilitaires, autocars, etc.) sous un contrat unique.',
    3,
    TRUE
),
(
    'Est-ce que mes chauffeurs sont couverts ?',
    'Oui, nos contrats incluent la garantie conducteur pour les salariés comme pour les indépendants, assurant une protection en cas d\'accident.',
    4,
    TRUE
),
(
    'Comment obtenir un devis ?',
    'Rien de plus simple : remplissez notre formulaire en ligne ou contactez-nous directement au 01 82 83 48 00.',
    5,
    TRUE
),
(
    'Combien de temps faut-il pour obtenir une réponse ?',
    'Un de nos conseillers vous recontacte dans les 24 heures suivant votre demande de devis.',
    6,
    TRUE
),
(
    'Puis-je modifier mon contrat en cours d\'année ?',
    'Oui, vous pouvez modifier votre contrat à tout moment en nous contactant. Des frais peuvent s\'appliquer selon les modifications.',
    7,
    TRUE
),
(
    'Que faire en cas de sinistre ?',
    'Contactez immédiatement notre service sinistres au 01 82 83 48 00 (disponible 24h/24 et 7j/7).',
    8,
    TRUE
);

-- =====================================================
-- Vue : devis_summary
-- Description : Résumé des devis avec statistiques
-- =====================================================

CREATE OR REPLACE VIEW devis_summary AS
SELECT 
    d.id,
    d.nom,
    d.prenom,
    d.raison_sociale,
    d.email,
    d.telephone,
    d.type_transport,
    d.souhaitez_assurer,
    d.status,
    d.created_at,
    CASE 
        WHEN d.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 'Nouveau'
        WHEN d.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 'Cette semaine'
        WHEN d.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 'Ce mois'
        ELSE 'Ancien'
    END as age_category
FROM devis_request d;

-- =====================================================
-- Statistiques des devis par statut
-- =====================================================

CREATE OR REPLACE VIEW devis_stats AS
SELECT 
    status,
    COUNT(*) as total,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 1 END) as today,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as this_week,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as this_month
FROM devis_request
GROUP BY status;

-- =====================================================
-- Statistiques par type de transport
-- =====================================================

CREATE OR REPLACE VIEW transport_stats AS
SELECT 
    type_transport,
    COUNT(*) as total,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM devis_request), 2) as percentage
FROM devis_request
GROUP BY type_transport;

-- =====================================================
-- Procédure stockée : Nettoyer les vieux devis
-- =====================================================

DELIMITER //

CREATE PROCEDURE cleanup_old_devis(IN days_old INT)
BEGIN
    DELETE FROM devis_request 
    WHERE status = 'pending' 
    AND created_at < DATE_SUB(NOW(), INTERVAL days_old DAY);
    
    SELECT ROW_COUNT() as deleted_rows;
END //

DELIMITER ;

-- =====================================================
-- Trigger : Log des modifications de statut
-- =====================================================

CREATE TABLE IF NOT EXISTS devis_status_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    devis_id INT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (devis_id) REFERENCES devis_request(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DELIMITER //

CREATE TRIGGER log_status_change
AFTER UPDATE ON devis_request
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO devis_status_log (devis_id, old_status, new_status)
        VALUES (NEW.id, OLD.status, NEW.status);
    END IF;
END //

DELIMITER ;

-- =====================================================
-- Index pour optimisation des performances
-- =====================================================

-- Index composites pour les requêtes fréquentes
CREATE INDEX idx_status_created ON devis_request(status, created_at);
CREATE INDEX idx_email_status ON devis_request(email, status);
CREATE INDEX idx_type_status ON devis_request(type_transport, status);

-- =====================================================
-- Utilisateur pour l'application (optionnel)
-- =====================================================

-- Créer un utilisateur dédié avec permissions limitées
CREATE USER IF NOT EXISTS 'assurance_user'@'%' IDENTIFIED BY 'assurance_pass';
GRANT SELECT, INSERT, UPDATE, DELETE ON assurance_db.* TO 'assurance_user'@'%';
FLUSH PRIVILEGES;

-- =====================================================
-- Commentaires sur les tables
-- =====================================================

ALTER TABLE devis_request COMMENT = 'Stocke toutes les demandes de devis des clients';
ALTER TABLE activite COMMENT = 'Liste des activités professionnelles disponibles';
ALTER TABLE garantie_type COMMENT = 'Types de garanties proposées avec leurs tarifs';
ALTER TABLE faq COMMENT = 'Questions fréquemment posées par les clients';

-- =====================================================
-- Fin du script SQL
-- =====================================================

-- Vérifier les tables créées
SHOW TABLES;

-- Vérifier le contenu des tables de référence
SELECT COUNT(*) as total_activites FROM activite;
SELECT COUNT(*) as total_garanties FROM garantie_type;
SELECT COUNT(*) as total_faqs FROM faq;

-- Afficher les statistiques
SELECT * FROM devis_stats;
SELECT * FROM transport_stats;

-- =====================================================
-- Notes importantes :
-- 
-- 1. Ce script crée la structure complète de la base
-- 2. Les données de test sont insérées automatiquement
-- 3. Les vues facilitent les rapports et statistiques
-- 4. Les triggers assurent la traçabilité
-- 5. Les index optimisent les performances
-- 
-- Pour exécuter ce script :
-- mysql -u root -p < schema.sql
-- 
-- Ou avec Docker :
-- docker-compose exec mysql mysql -u root -p < schema.sql
-- =====================================================
