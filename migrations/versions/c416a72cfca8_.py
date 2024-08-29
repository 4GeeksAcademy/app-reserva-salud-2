"""empty message

<<<<<<<< HEAD:migrations/versions/c416a72cfca8_.py
Revision ID: c416a72cfca8
Revises: 
Create Date: 2024-08-22 17:29:35.584910
========
Revision ID: 8dfad6486f82
Revises: 
Create Date: 2024-08-29 12:29:44.063610
>>>>>>>> develop:migrations/versions/8dfad6486f82_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/c416a72cfca8_.py
revision = 'c416a72cfca8'
========
revision = '8dfad6486f82'
>>>>>>>> develop:migrations/versions/8dfad6486f82_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('speciality',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('state',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('city',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('state_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['state_id'], ['state.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('professional',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('gender', sa.Enum('MALE', 'FEMALE', 'OTHER', name='genderenum'), nullable=True),
    sa.Column('certificate', sa.String(length=200), nullable=True),
    sa.Column('profile_picture', sa.String(length=200), nullable=True),
    sa.Column('telephone', sa.String(length=200), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('is_validated', sa.Boolean(), nullable=True),
    sa.Column('city_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['city_id'], ['city.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('professional', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_professional_email'), ['email'], unique=True)

    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('birth_date', sa.Date(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('state_id', sa.Integer(), nullable=True),
    sa.Column('city_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['city_id'], ['city.id'], ),
    sa.ForeignKeyConstraint(['state_id'], ['state.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)

    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('professional_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('start_time', sa.Time(), nullable=False),
    sa.Column('end_time', sa.Time(), nullable=False),
    sa.Column('weekly', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('is_available', sa.Boolean(), nullable=False),
    sa.Column('is_remote', sa.Boolean(), nullable=False),
    sa.Column('is_presential', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('professional_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.Column('score', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('professional_speciality',
    sa.Column('professional_id', sa.Integer(), nullable=False),
    sa.Column('speciality_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.ForeignKeyConstraint(['speciality_id'], ['speciality.id'], ),
    sa.PrimaryKeyConstraint('professional_id', 'speciality_id')
    )
    op.create_table('appointment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('professional_id', sa.Integer(), nullable=False),
    sa.Column('availability_id', sa.Integer(), nullable=False),
<<<<<<<< HEAD:migrations/versions/c416a72cfca8_.py
========
    sa.Column('cancellation_reason', sa.Text(), nullable=True),
>>>>>>>> develop:migrations/versions/8dfad6486f82_.py
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('hour', sa.Time(), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('is_confirmed', sa.Boolean(), nullable=True),
    sa.Column('is_done', sa.Boolean(), nullable=True),
    sa.Column('type', sa.Enum('remote', 'presential', name='appointment_type'), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['availability_id'], ['availability.id'], ),
    sa.ForeignKeyConstraint(['professional_id'], ['professional.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('appointment')
    op.drop_table('professional_speciality')
    op.drop_table('comment')
    op.drop_table('availability')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    with op.batch_alter_table('professional', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_professional_email'))

    op.drop_table('professional')
    op.drop_table('city')
    op.drop_table('state')
    op.drop_table('speciality')
    # ### end Alembic commands ###
